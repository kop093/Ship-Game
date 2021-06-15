import React, { useCallback, useEffect, useState, useRef } from "react";
import GameGrid from "./GameGrid";
import styled from "styled-components";
import MenuBar from "./MenuBar";
import GlobalStyles from "./GlobalStyles";
import ActionBar from "./ActionBar";

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

const getCanon = (playerX, playerY, canonOnMap) => {
  for (let i = 0; i < canonOnMap.length; i++) {
    if (canonOnMap[i] != null) {
      if (
        playerY === canonOnMap[i].canonY &&
        playerX === canonOnMap[i].canonX
      ) {
        return i;
      }
    }
  }
};

const getFightEnemy = (PlayerX, PlayerY, enemy) => {
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i] != null) {
      if (PlayerY === enemy[i].enemyY && PlayerX === enemy[i].enemyX) {
        return i;
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
    const { row, col } = action;

    const direction = getDirection({
      playerX: game.playerX,
      playerY: game.playerY,
      y: parseInt(row),
      x: parseInt(col),
    });

    const canonFound = getCanon(game.playerX, game.playerY, game.canonOnMap);

    const enemyConflict = getFightEnemy(game.playerX, game.playerY, game.enemy);

    fetch(`/game/player/move/${direction}/${canonFound}/${enemyConflict}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((game) => {
        console.log(
          `/game/player/move/${direction}/${canonFound}/${enemyConflict}`
        );
        console.log(game);
        setGame(game);
      });
  }, [action]);

  if (game.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppWrapper>
      <GlobalStyles />
      <MenuBar />
      <ActionBarPosition>
        <GameGrid game={game}></GameGrid>
        <ActionBar game={game}></ActionBar>
      </ActionBarPosition>
      <BorderBase></BorderBase>
    </AppWrapper>
  );
}
const AppWrapper = styled.div`
  margin-left: 15%;
`;
const ActionBarPosition = styled.div`
  display: flex;
`;

const BorderBase = styled.div`
  border: 2px solid;
  width: 1100px;
  z-index: 10;
`;
export default App;
