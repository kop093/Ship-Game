import React, { useEffect, useState } from "react";
import GameGrid from "./GameGrid";

const getDirectionFromClick = (playerX, playerY, x, y) => {
  const dx = x - playerX;
  const dy = y - playerY;
  const angle = (Math.atan(dy / dx) * 360) / 2 / Math.PI;
  // console.log(angle);
  if (dx >= 0) {
    //clicked right of the player
    if (dy >= 0) {
      //clicked below the player(s or e)
      if (angle > 45) {
        return "south";
      } else {
        return "east";
      }
    } else {
      //clicked above the player(n or e)
      console.log(angle);
    }
  } else {
    //clicked left of the player
    if (dy >= 0) {
      //clicked below the player(s or w)
    } else {
      //clicked above the player(n or w)
    }
  }
};

function App() {
  const [game, setGame] = useState({ isLoading: true });

  useEffect(() => {
    fetch("/game", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, []);

  useEffect(() => {
    if (game.isLoading) {
      return;
    }
    document.addEventListener("click", (ev) => {
      const id = ev.target.id;
      let [cell, row, col] = id.split("-");
      if (cell !== "cell") return;
      row = parseInt(row);
      col = parseInt(col);
      const direction = getDirectionFromClick(
        game.playerX,
        game.playerY,
        col,
        row
      );

      fetch(`/game/player/move/${direction}`, { method: "PUT" })
        .then((res) => res.json())
        .then((data) => setGame(data));
    });
  }, [game]);

  if (game.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <GameGrid game={game}></GameGrid>
    </div>
  );
}

export default App;
