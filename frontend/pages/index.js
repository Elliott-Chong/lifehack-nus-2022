import Image from "next/image";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../context";

export default function Home() {
  const { state } = useGlobalContext();
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
      </main>
    </>
  );
}
