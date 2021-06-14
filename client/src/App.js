import React, { useCallback, useEffect, useState, useRef } from "react";
import GameGrid from "./GameGrid";

const getDirection = ({ playerX, playerY, x, y }) => {
  const dx = x - playerX;
  const dy = playerY - y;
  const angle = (Math.atan(dy / dx) * 360) / 2 / Math.PI;
  // console.log(`dx:${dx} and dy:${dy}`);
  // console.log(angle);
  if (dx >= 0) {
    //clicked right of the player
    if (dy >= 0) {
      //clicked above the player(n or e)
      if (angle > 45) {
        // console.log("north");
        return "north";
      } else {
        // console.log("east");
        return "east";
      }
    } else {
      //clicked below the player(s or e)
      if (angle > -45) {
        // console.log("east");
        return "east";
      } else {
        // console.log("south");
        return "south";
      }
    }
  } else {
    //clicked left of the player
    if (dy >= 0) {
      //clicked below the player(n or w)
      if (angle > -45) {
        // console.log("west");
        return "west";
      } else {
        // console.log("north");
        return "north";
      }
    } else {
      //clicked above the player(s or w)
      if (angle > 45) {
        // console.log("south");
        return "south";
      } else {
        // console.log("west");
        return "west";
      }
    }
  }
};

function App() {
  const [game, setGame] = useState({ isLoading: true });

  const [action, setAction] = useState(null);

  const handleClick = (ev) => {
    const [cell, row, col] = ev.target.id.split("-");

    // To prevent the "row" div from proceeding
    if (cell !== "cell") return;

    // Probably not needed
    ev.stopPropagation();

    setAction({ row, col });
  };

  useEffect(() => {
    fetch("/game", { method: "POST" })
      .then((res) => res.json())
      .then((game) => {
        setGame(game);
        document.addEventListener("click", handleClick);
      });
  }, []);

  useEffect(() => {
    if (!action) {
      return;
    }
    console.log(game);
    const { row, col } = action;

    const direction = getDirection({
      playerX: game.playerX,
      playerY: game.playerY,
      y: parseInt(row),
      x: parseInt(col),
    });

    fetch(`/game/player/move/${direction}`, { method: "PUT" })
      .then((res) => res.json())
      .then((game) => {
        setGame(game);
      });
  }, [action]);

  if (game.isLoading || !game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <GameGrid game={game}></GameGrid>
    </div>
  );
}

export default App;
