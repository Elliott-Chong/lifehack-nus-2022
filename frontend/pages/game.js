import Head from "next/head";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  "pk.eyJ1IjoidWx0cmFyYXB0b3IiLCJhIjoiY2t0cGo5aThxMGFxMzJybXBiNmZ3bWY4eSJ9.q24IUWxYYm6DhTDn5pY2Rg";
function rotateCamera(map, timestamp) {
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 100) % 360, { duration: 0 });
  // Request the next frame of the animation.
  requestAnimationFrame(rotateCamera);
}
function x() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-119.99959421984575);
  const [lat, setLat] = useState(38.619551620333496);
  const [zoom, setZoom] = useState(14);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      pitch: 60,
      antialias: true,
      bearing: 80,
      zoom: zoom,
      tileSize: 512,
      maxZoom: 16,
    });
    map.on("load", () => {
      rotateCamera(map, 0);
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        // maxZoom: 16,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
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
      <div>
        <div>daddy</div>
        <div
          ref={mapContainer}
          className="map"
          // style="width: 400px; height: 300px;"
        />
      </div>
    </div>
  );
}

export default x;
