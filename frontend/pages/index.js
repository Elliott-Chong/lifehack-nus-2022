import Image from "next/image";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../context";
import Webcam from "react-webcam";

export default function Home() {
  const { state } = useGlobalContext();
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

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
        {/* <Webcam
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
              onClick={() => {
                if (!state.user) {
                  alert("Please sign in first!");
                  return;
                }
                const imageSrc = getScreenshot();
              }}
            >
              Capture photo
            </button>
          )}
        </Webcam> */}
      </main>
    </>
  );
}
