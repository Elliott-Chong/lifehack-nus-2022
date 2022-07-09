import React from "react";
import Image from "next/image";
import { useGlobalContext } from "../context";
import Navbar from "../components/Navbar";

function Die() {
  const { state } = useGlobalContext();
  const { user } = state;
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default Die;
