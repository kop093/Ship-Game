import React, { useEffect } from "react";
import styled from "styled-components";

const GameGrid = (props) => {
  const { game } = props;
  const {
    canonOnShip,
    canonOnMap,
    gameHeight,
    gameWidth,
    playerX,
    playerY,
    enemy,
  } = game;

  let rows = [];
  for (let row = 1; row <= game.gameHeight; row++) {
    let cols = [];
    for (let col = 1; col <= game.gameWidth; col++) {
      let classNames = "";
      let image = <img />;

      //canon on map
      for (let i = 0; i < canonOnMap.length; i++) {
        if (canonOnMap[i] != null) {
          if (row === canonOnMap[i].canonY && col === canonOnMap[i].canonX) {
            classNames = "Canon";
            image = (
              <img src="image/kenney_piratepack/PNG/Default_size/Ships/Ship1.png" />
            );
          }
        }
      }

      //enemy
      for (let i = 0; i < enemy.length; i++) {
        if (enemy[i] != null) {
          if (row === enemy[i].enemyY && col === enemy[i].enemyX) {
            classNames = "Enemy";
            image = (
              <img src="image/kenney_piratepack/PNG/Default_size/Ships/Ship1.png" />
            );
          }
        }
      }

      //player
      if (row === playerY && col === playerX) {
        classNames = "Player";
        image = (
          <img src="image/kenney_piratepack/PNG/Default_size/Ships/Ship1.png" />
        );
      }

      //island
      let islandX = gameWidth;
      let islandY = gameHeight;
      if (row === islandY - 1 && col === islandX - 1) {
        classNames = "Island";
        image = (
          <img src="image/kenney_piratepack/PNG/Default_size/Tiles/tile_01.png" />
        );
      } else if (row === islandY - 1 && col === islandX - 0) {
        classNames = "Island";
        image = (
          <img src="image/kenney_piratepack/PNG/Default_size/Tiles/tile_02.png" />
        );
      } else if (row === islandY - 0 && col === islandX - 1) {
        classNames = "Island";
        image = (
          <img src="image/kenney_piratepack/PNG/Default_size/Tiles/tile_17.png" />
        );
      } else if (row === islandY && col === islandX) {
        classNames = "Island";
        image = (
          <img src="image/kenney_piratepack/PNG/Default_size/Tiles/tile_18.png" />
        );
      }

      const id = `cell-${row}-${col}`;
      cols.push(
        <div key={id} className={classNames} id={id}>
          {image}
        </div>
      );
    }
    rows.push(
      <div key={`row-${row}`} className="GameGridRow">
        {cols}
      </div>
    );
  }

  return <GameGridWrapper className="GameGrid">{rows}</GameGridWrapper>;
};

const GameGridWrapper = styled.div`
  .GameGridRow {
    display: flex;
  }
  .GameGridRow > div {
    flex-direction: row;
    min-width: 40px;
    min-height: 40px;
    background-color: lightseagreen;
    border: 0.1px solid;
    justify-content: center;
  }

  .GameGridRow > div.Player > img {
    position: absolute;
    height: 35px;
    margin-left: 0.5%;
  }

  .GameGridRow > div.Enemy {
    background-color: red;
  }

  .GameGridRow > div.Island {
    background-color: yellowgreen;
  }

  .GameGridRow > div.Island > img {
    position: absolute;
    width: 40px;
    height: 40px;
  }

  .GameGridRow > div.Canon {
    background-color: gray;
  }
`;

export default GameGrid;
