import Head from "next/head";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
// import requestAnimationFrame from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useGlobalContext } from "../context";
import Navbar from "../components/Navbar";
import data from "../data/stash.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoidWx0cmFyYXB0b3IiLCJhIjoiY2t0cGo5aThxMGFxMzJybXBiNmZ3bWY4eSJ9.q24IUWxYYm6DhTDn5pY2Rg";

function map() {
  const { state } = useGlobalContext();
  const { user } = state;
  const mapContainer = useRef(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(18);
  const [pitch, setPitch] = useState(50);
  const [bearing, setBearing] = useState(0);
  const [timestamp, setTimeStamp] = useState(0);
  const [maxPitch, setMaxPitch] = useState(65);
  const [minPitch, setMinPitch] = useState(35);
  useEffect(() => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [lng, lat],
      pitch: pitch,
      bearing: bearing,
      zoom: zoom,
      minPitch: minPitch,
      maxPitch: maxPitch,
    });

    var geoLocate = new mapboxgl.GeolocateControl({
      fitBoundsOptions: {
        maxZoom: zoom,
      },
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      // trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      trackUserLocation: true,
      showUserHeading: false,
      showAccuracyCircle: true,
    });
    map.addControl(geoLocate);
    geoLocate.on("geolocate", function () {
      map.setZoom(zoom);
    });
    map.on("load", () => {
      geoLocate.trigger();
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
      map["scrollZoom"].disable();
      map["dragPan"].disable();
      map["doubleClickZoom"].disable();
      map["boxZoom"].disable();
    });

    const player = document.createElement("div");
    player.style.backgroundImage = `url(https://cdn.discordapp.com/attachments/995303058131128371/995417061041901568/Yellow_Corn_2.png)`;
    player.id = `playerChar`;
    player.style.minWidth = `10px`;
    player.style.maxWidth = `50px`;
    player.style.width = `10vw`;
    player.style.aspectRatio = `3/4`;
    player.style.backgroundSize = `100%`;
    player.style.zIndex = `99`;
    if (location) {
      location.getCurrentPosition(
        (position) => {
          player.dataset.lng = position.coords.longitude;
          player.dataset.lat = position.coords.latitude;
          const marker = new mapboxgl.Marker(player, { anchor: "bottom" })
            .setLngLat([position.coords.longitude, position.coords.latitude])
            .addTo(map);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    function distance(lat1, lat2, lon1, lon2) {
      // The math module contains a function
      // named toRadians which converts from
      // degrees to radians.
      lon1 = (lon1 * Math.PI) / 180;
      lon2 = (lon2 * Math.PI) / 180;
      lat1 = (lat1 * Math.PI) / 180;
      lat2 = (lat2 * Math.PI) / 180;

      // Haversine formula
      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

      let c = 2 * Math.asin(Math.sqrt(a));

      // Radius of earth in kilometers. Use 3956
      // for miles
      let r = 6371;

      // calculate the result
      return c * r;
    }
    for (var points of data) {
      const treasure = document.createElement("div");
      treasure.className = "chest";
      treasure.style.minWidth = `75px`;
      treasure.style.maxWidth = `100px`;
      treasure.style.width = `10vw`;
      treasure.style.aspectRatio = `4/3`;
      treasure.style.backgroundSize = `100%`;
      treasure.style.zIndex = `98`;
      treasure.dataset.lng = points.lng;
      treasure.dataset.lat = points.lat;
      treasure.addEventListener("click", () => {
        var pointDist = distance(
          document.getElementById("playerChar").dataset.lat,
          points.lat,
          document.getElementById("playerChar").dataset.lng,
          points.lng
        );
        if (pointDist <= 0.02) {
          // Make Game Here
          window.location.href = "./game";
        }
      });
      new mapboxgl.Marker(treasure, { anchor: "bottom" })
        .setLngLat([points.lng, points.lat])
        .addTo(map);
    }
  }, [lat, lng]);
  return (
    <div>
      <Navbar />
      <div id="gameBody">
        {user && (
          <div
            id="menu"
            className="absolute top-15 gap-6 left-0 z-40 py-4 px-8 flex flex-col h-screen bg-light-green"
          >
            <div id="profile" className="flex flex-col gap-2 items-center">
              <Image
                width={120}
                height={120}
                className="rounded-full"
                src={user.photoURL}
              />
              <h1 className="font-noteworthy text-xl font-bold">
                {user.displayName}
              </h1>
            </div>
            <div id="treasured">
              <h1 className="text-xl font-bold font-noteworthy">Treasured:</h1>
              <div className="grid grid-cols-4 gap-4">
                {state.treasured.map((item) => {
                  return (
                    <span className="relative">
                      <img
                        width={40 * 1.33}
                        height={40}
                        src={`/images/${item.name}_Icon.png`}
                      />
                      <span className="game-icon-number-bottle">
                        {item.count}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
            <div id="inventory">
              <h1 className="text-xl font-bold font-noteworthy">Inventory:</h1>
              <div className="grid grid-cols-4 gap-4">
                {state.inventory.map((item) => {
                  return (
                    <span className="relative">
                      <img
                        width={40 * 1.33}
                        height={40}
                        src={`/images/${item.name}_Icon.png`}
                      />
                      <span className="game-icon-number-bottle">
                        {item.count}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div ref={mapContainer} className="map" />
      </div>
    </div>
  );
}

export default map;
