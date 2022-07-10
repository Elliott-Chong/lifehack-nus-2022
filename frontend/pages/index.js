import Image from "next/image";
import axios from "axios";
import Navbar from "../components/Navbar";
import React from "react";
import { useGlobalContext } from "../context";
import Webcam from "react-webcam";

export default function Home() {
  const { state, dispatch } = useGlobalContext();
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const [rectImg, setRectImg] = React.useState(null);

  return (
    <>
      <Navbar />
      <main className="px-20 bg-light-green pt-5 h-screen">
        {state.user && (
          <>
            <div className="flex items-center gap-4">
              <h1 className="font-noteworthy text-xl font-bold">
                Logged in as:{" "}
                <span className="font-normal">{state.user.displayName}</span>
              </h1>
              <Image
                width={50}
                height={50}
                className="rounded-full"
                src={state.user.photoURL}
              />
            </div>
          </>
        )}
        <Webcam
          audio={false}
          height={260}
          className="mt-5"
          screenshotFormat="image/jpeg"
          // width={1280}
          // videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
            <button
              className="px-4 py-2 text-center mt-2 bg-btn-green rounded-md shadow-md hover:shadow-lg cursor-pointer"
              onClick={async () => {
                if (!state.user) {
                  alert("Please sign in first!");
                  return;
                }
                const imageSrc = getScreenshot();
                const body = JSON.stringify({ file: imageSrc });
                const config = {
                  headers: { "Content-Type": "application/json" },
                };
                console.log("POSTING...");
                const response = await axios.post(
                  "http://localhost:5000",
                  body,
                  config
                );
                console.log(response.data);
                dispatch({ type: "update_inventory", payload: response.data });
                setRectImg(response.data.image);
              }}
            >
              Capture photo
            </button>
          )}
        </Webcam>
        {rectImg && <img src={rectImg} />}
      </main>
    </>
  );
}
