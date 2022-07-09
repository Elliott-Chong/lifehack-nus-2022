import Head from "next/head";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useGlobalContext } from "../context";
import Navbar from "../components/Navbar";
mapboxgl.accessToken =
  "pk.eyJ1IjoidWx0cmFyYXB0b3IiLCJhIjoiY2t0cGo5aThxMGFxMzJybXBiNmZ3bWY4eSJ9.q24IUWxYYm6DhTDn5pY2Rg";

function map() {
  const {
    state: { user },
  } = useGlobalContext();
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(103.8647296);
  const [lat, setLat] = useState(1.3336576);
  const [zoom, setZoom] = useState(15);
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
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      pitch: 10,
      bearing: 0,
      zoom: zoom,
    });
    map.on("load", () => {
      // rotateCamera(0);
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
    });
    var geoLocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: false,
    });
    map.addControl(geoLocate);
    geoLocate.on("geolocate", function (e) {
      console.log("geolocated");
      map.setZoom(zoom);
    });
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
            className="absolute top-15 left-0 z-40 py-4 px-8 flex flex-col bg-light-green"
          >
            <div id="profile" className="flex flex-col gap-2 items-center">
              <Image
                width={100}
                height={100}
                className="rounded-full"
                src={user.photoURL}
              />
              <h1 className="font-noteworthy text-xl font-bold">
                {user.displayName}
              </h1>
            </div>
            <div id="treasured"></div>
            <div id="inventory"></div>
          </div>
        )}
        <div
          ref={mapContainer}
          className="map"
          // style="width: 400px; height: 300px;"
        />
      </div>
    </div>
  );
}

export default map;
