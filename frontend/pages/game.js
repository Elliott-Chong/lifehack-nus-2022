import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Game() {
  const [width, setWidth] = useState();
  function keyPress(move) {
    var player = document.getElementById("player");
    if (screen.width <= 640) {
      for (var racoon of document.querySelectorAll(".racoon")) {
        racoon.classList.add("racoonMoveUD");
        setTimeout(() => {
          racoon.remove();
        }, racoon.style.animationDuration.split("ms")[0]);
      }
      switch (move) {
        case "left":
          if (Number(player.style.left.replace("%", "")) > 10) {
            player.style.left =
              Number(player.style.left.replace("%", "")) - 4 + "%";
          }
          break;
        case "right":
          if (Number(player.style.left.replace("%", "")) < 90) {
            player.style.left =
              Number(player.style.left.replace("%", "")) + 4 + "%";
          }
          break;
        case "shoot":
          var bottle = document.createElement("div");
          bottle.className = "bottle bottleMoveUD";
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
          var divCheckingInterval = setInterval(function () {
            // Find it with a selector
            for (var bottles of document.querySelectorAll(".bottle")) {
              for (var racoon of document.querySelectorAll(".racoon")) {
                if (elementsOverlap(bottles, racoon)) {
                  bottles.remove();
                  racoon.remove();
                  clearInterval(divCheckingInterval);
                }
              }
            }
            if (document.querySelectorAll(".racoon").length <= 0) {
              alert("end");
              clearInterval(divCheckingInterval);
            }
          }, 100);
          setTimeout(() => {
            bottle.remove();
          }, 1000);
          break;
      }
    } else {
      for (var racoon of document.querySelectorAll(".racoon")) {
        racoon.classList.add("racoonMoveLR");
        setTimeout(() => {
          racoon.remove();
        }, racoon.style.animationDuration.split("ms")[0]);
      }
      switch (move) {
        case "left":
          if (Number(player.style.bottom.replace("%", "")) < 90) {
            player.style.bottom =
              Number(player.style.bottom.replace("%", "")) + 4 + "%";
          }
          break;
        case "right":
          if (Number(player.style.bottom.replace("%", "")) > 10) {
            player.style.bottom =
              Number(player.style.bottom.replace("%", "")) - 4 + "%";
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
          var divCheckingInterval = setInterval(function () {
            // Find it with a selector
            for (var bottles of document.querySelectorAll(".bottle")) {
              for (var racoon of document.querySelectorAll(".racoon")) {
                if (elementsOverlap(bottles, racoon)) {
                  bottles.remove();
                  racoon.remove();
                  clearInterval(divCheckingInterval);
                }
              }
            }
            if (document.querySelectorAll(".racoon").length <= 0) {
              alert("end");
              clearInterval(divCheckingInterval);
            }
          }, 100);
          setTimeout(() => {
            bottle.remove();
          }, 1000);
          break;
      }
    }
  }
  function elementsOverlap(el1, el2) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
  }

  useEffect(() => {
    var racoon = document.createElement("div");
    racoon.className = "racoon";
    if (screen.width <= 640) {
      racoon.style.bottom = `35%`;
      racoon.style.left = `${Math.floor(Math.random() * (90 - 10)) + 10 + "%"}`;
      racoon.style.transform = `translate(-50%)`;
    } else {
      racoon.style.bottom = `${
        Math.floor(Math.random() * (95 - 10)) + 10 + "%"
      }`;
      racoon.style.left = `10%`;
      racoon.style.transform = `translate(0px, 50%)`;
    }
    racoon.style.animationDuration = `${Math.random() * 1000 + 2500}ms`;
    var racoonImg = document.createElement("img");
    racoonImg.src =
      "https://cdn.discordapp.com/attachments/995303058131128371/995504328905338921/Raccoon.png";
    racoonImg.style.transform = `scaleX(-1)`;
    racoon.appendChild(racoonImg);
    document.getElementById("gameContainer").appendChild(racoon);

    setWidth(screen.width);
    document.getElementById("buttons").addEventListener("click", (e) => {
      keyPress(e.target.id);
    });
    document.addEventListener("keydown", (e) => {
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
            <i className="bi bi-arrow-left-circle-fill" id="left"></i>
            <i className="bi bi-record-circle-fill" id="shoot"></i>
            <i className="bi bi-arrow-right-circle-fill" id="right"></i>
          </div>
          {/* <div
            className="racoon"
            style={
              width <= 640
                ? {
                    transform: "translate(-50%)",
                    bottom: "35%",
                    left: "50%",
                    animationDuration: Math.random() + 3 + "s",
                  }
                : {
                    transform: "translate(0, 50%)",
                    bottom: "50%",
                    left: "10%",
                    animationDuration: Math.random() + 3 + "s",
                  }
            }
          >
            <img
              src={
                "https://cdn.discordapp.com/attachments/995303058131128371/995504328905338921/Raccoon.png"
              }
              style={{ transform: "scaleX(-1)" }}
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

export default Game;
