import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function game() {
  const [width, setWidth] = useState();
  function keyPress(move) {
    var player = document.getElementById("player");
    if (screen.width <= 640) {
      switch (move) {
        case "left":
          if (Number(player.style.left.replace("%", "")) >= 10) {
            player.style.left =
              Number(player.style.left.replace("%", "")) - 1 + "%";
          }
          break;
        case "right":
          if (Number(player.style.left.replace("%", "")) <= 90) {
            player.style.left =
              Number(player.style.left.replace("%", "")) + 1 + "%";
          }
          break;
        case "shoot":
          var bottle = document.createElement("div");
          bottle.className = "bottle, bottleMoveUD";
          bottle.style.bottom = `${
            Number(player.style.bottom.replace("%", "")) + "%"
          }`;
          bottle.style.left = `${
            Number(player.style.left.replace("%", "")) - 10 + "%"
          }`;
          var bottleImg = document.createElement("img");
          bottleImg.src =
            "https://cdn.discordapp.com/attachments/995303058131128371/995508460772921414/Plastic_Bottle.png";
          bottle.appendChild(bottleImg);
          document.getElementById("gameContainer").appendChild(bottle);
          setTimeout(() => {
            bottle.remove();
          }, 1000);
          break;
      }
    } else {
      switch (move) {
        case "left":
          if (Number(player.style.bottom.replace("%", "")) <= 90) {
            player.style.bottom =
              Number(player.style.bottom.replace("%", "")) + 2 + "%";
          }
          break;
        case "right":
          if (Number(player.style.bottom.replace("%", "")) >= 10) {
            player.style.bottom =
              Number(player.style.bottom.replace("%", "")) - 2 + "%";
          }
          break;
        case "shoot":
          var bottle = document.createElement("div");
          bottle.className = "bottle bottleMoveLR";
          bottle.style.bottom = `${
            Number(player.style.bottom.replace("%", "")) - 10 + "%"
          }`;
          var bottleImg = document.createElement("img");
          bottleImg.src =
            "https://cdn.discordapp.com/attachments/995303058131128371/995508460772921414/Plastic_Bottle.png";
          bottle.appendChild(bottleImg);

          document.getElementById("gameContainer").appendChild(bottle);
          setTimeout(() => {
            bottle.remove();
          }, 1000);

          break;
      }
    }
    console.log(move);
  }

  useEffect(() => {
    setWidth(screen.width);
    document.getElementById("buttons").addEventListener("click", (e) => {
      keyPress(e.target.id);
    });
    document.addEventListener("keydown", (e) => {
      console.log(e);
      switch (e.key) {
        case "w":
        case "a":
        case "ArrowLeft":
        case "ArrowUp":
          keyPress("left");
          break;
        case "d":
        case "s":
        case "ArrowRight":
        case "ArrowDown":
          keyPress("right");
          break;
        case " ":
          keyPress("shoot");
          break;
      }
    });
  }, [width]);

  return (
    <div>
      <Navbar />
      <div id="game">
        <div id="gameContainer">
          <div id="buttons">
            <i class="bi bi-arrow-left-circle-fill" id="left"></i>
            <i class="bi bi-record-circle-fill" id="shoot"></i>
            <i class="bi bi-arrow-right-circle-fill" id="right"></i>
          </div>
          <div
            id="racoon"
            className="racoonMoveLR"
            style={
              width <= 640
                ? {
                    transform: "translate(-50%)",
                    bottom: "20%",
                    left: "50%",
                    animationDuration: Math.random() + 1 + "s",
                  }
                : {
                    transform: "translate(0, 50%)",
                    bottom: "50%",
                    left: "10%",
                    animationDuration: Math.random() + 1 + "s",
                  }
            }
          >
            <img
              src={
                "https://cdn.discordapp.com/attachments/995303058131128371/995504328905338921/Raccoon.png"
              }
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
          {/* <div className="bottle">
            <img
              src={
                "https://cdn.discordapp.com/attachments/995303058131128371/995508460772921414/Plastic_Bottle.png"
              }
            />
          </div> */}

          <div
            id="player"
            style={
              width <= 640
                ? { transform: "translate(-50%)", bottom: "20%", left: "50%" }
                : { transform: "translate(10px, 50%)", bottom: "50%" }
            }
          >
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
