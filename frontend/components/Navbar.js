import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="font-noteworthy flex-col sticky bg-white top-0 font-bold md:flex-row flex px-20 py-2">
      <h1 className="md:text-3xl text-xl">A Unicorn's Treasure</h1>
      <div className="md:ml-auto sm:m-0 md:flex-row flex-col flex gap-2">
        <Link href="/login">
          <a className="px-4 py-2 text-center bg-btn-green rounded-md shadow-md hover:shadow-lg cursor-pointer">
            Login
          </a>
        </Link>
        <Link href="/register">
          <a className="px-4 py-2 bg-btn-green text-center rounded-md shadow-md hover:shadow-lg cursor-pointer">
            Register
          </a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
