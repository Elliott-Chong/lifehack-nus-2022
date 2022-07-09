import Head from "next/head";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
// import requestAnimationFrame from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useGlobalContext } from "../context";
import Navbar from "../components/Navbar";
import customerMarker from "../components/Marker";
mapboxgl.accessToken =
  "pk.eyJ1IjoidWx0cmFyYXB0b3IiLCJhIjoiY2t0cGo5aThxMGFxMzJybXBiNmZ3bWY4eSJ9.q24IUWxYYm6DhTDn5pY2Rg";

function map() {
  const {
    state: { user },
  } = useGlobalContext();
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(18);
  const [pitch, setPitch] = useState(50);
  const [bearing, setBearing] = useState(0);
  const [timestamp, setTimeStamp] = useState(0);
  const [maxPitch, setMaxPitch] = useState(65);
  const [minPitch, setMinPitch] = useState(35);
  const zoomMap = (e) => {
    alert("daddy");
  };
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
      showUserHeading: true,
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
    player.style.backgroundImage = `url(https://cdn.discordapp.com/attachments/910885868733087747/995388685740679168/Yellow_corn-1.png)`;
    player.style.width = `100px`;
    player.style.aspectRatio = `4/3`;
    player.style.backgroundSize = `100%`;
    player.style.zIndex = `99`;
    const marker = new mapboxgl.Marker(player, { anchor: "bottom" })
      .setLngLat([103.7966348, 1.4302973])
      .addTo(map);
    console.log(marker);
  });
  return (
    <div>
      <Head>
        <title>A Unicorn's Adventure</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>

        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div>
        {user && (
          <div
            id="menu"
            className="absolute top-15 gap-6 left-0 z-40 py-4 px-8 flex flex-col bg-light-green"
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
                <Image width={50} height={50} src="/images/Bottle_Icon.png" />
              </div>
            </div>
            <div id="inventory"></div>
          </div>
        )}
        <div
          ref={mapContainer}
          className="map"
          onWheel={zoomMap}
          // style="width: 400px; height: 300px;"
        />
      </div>
    </div>
  );
}

export default map;
