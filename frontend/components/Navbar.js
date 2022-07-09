import React from "react";
import { auth } from "../firebase";
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
    <nav className="font-noteworthy flex-col sticky bg-white top-0 font-bold md:flex-row flex px-20 py-2">
      <h1 className="md:text-3xl md:m-0 mb-2 text-xl">A Unicorn's Treasure</h1>
      <div className="md:ml-auto sm:m-0 md:flex-row flex-col flex gap-2">
        {!state.user ? (
          <a
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle();
            }}
            className="px-4 py-2 text-center bg-btn-green rounded-md shadow-md hover:shadow-lg cursor-pointer"
          >
            Sign in
          </a>
        ) : (
          <a
            onClick={(e) => {
              e.preventDefault();
              signOut(auth);
              dispatch({ type: "logout" });
            }}
            className="px-4 py-2 text-center bg-btn-green rounded-md shadow-md hover:shadow-lg cursor-pointer"
          >
            Log out
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
