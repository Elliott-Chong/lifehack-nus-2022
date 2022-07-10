import Head from "next/head";
import React from "react";
import { auth } from "../firebase";
import Link from "next/link";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useGlobalContext } from "../context";

function Navbar() {
  const { dispatch, state } = useGlobalContext();
  React.useEffect(() => {
    let yes = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "set_user", payload: user });
      }
    });
    return yes;
  }, []);
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response);
      dispatch({ type: "set_user", payload: response.user });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
        />
        <title>A Unicorn's Treasure</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <nav className="font-noteworthy flex-row sticky bg-white top-0 font-bold flex px-5 md:px-20 py-2 justify-between items-center">
        <Link href="/">
          <h1 className="md:text-3xl m-0 text-l cursor-pointer">
            A Unicorn's Treasure
          </h1>
        </Link>
        <div className="md:ml-auto sm:m-0 flex-row flex gap-2">
          <Link href="/map">
            <a className="px-4 py-2 text-center bg-btn-green rounded-md shadow-md hover:shadow-lg cursor-pointer">
              Map
            </a>
          </Link>
          {!state.user ? (
            <>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signInWithGoogle();
                }}
                className="px-4 py-2 text-center bg-btn-green rounded-md shadow-md hover:shadow-lg cursor-pointer"
              >
                Sign in
              </a>
            </>
          ) : (
            <>
              <Link href="/game">
                <a className="px-4 py-2 hidden md:inline text-center bg-btn-green rounded-md shadow-md hover:shadow-lg cursor-pointer">
                  Game
                </a>
              </Link>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signOut(auth);
                  dispatch({ type: "logout" });
                }}
                className="px-4 hidden md:inline py-2 text-center bg-btn-green rounded-md shadow-md hover:shadow-lg cursor-pointer"
              >
                Log out
              </a>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
