import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function game() {
  return (
    <div>
      <Navbar />
      <div id="game">
        <div id="gameContainer">
          <div id="racoon">
            <img
              src={
                "https://cdn.discordapp.com/attachments/995303058131128371/995504328905338921/Raccoon.png"
              }
            />
          </div>
          <div id="player">
            <img
              src={
                "https://cdn.discordapp.com/attachments/995303058131128371/995417061041901568/Yellow_Corn_2.png"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default game;
