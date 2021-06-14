import React, { useEffect } from "react";
import styled from "styled-components";

const GameGrid = (props) => {
  const { game } = props;
  const { playerX, playerY } = game;

  let rows = [];
  for (let row = 1; row <= game.gameHeight; row++) {
    let cols = [];
    for (let col = 1; col <= game.gameWidth; col++) {
      let classNames = "";
      let image = <img />;
      if (row === playerY && col === playerX) {
        classNames = "Player";
        image = (
          <img src="image/kenney_piratepack/PNG/Default_size/Ships/Ship1.png" />
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
    background-color: aqua;
    border: 0.1px solid;
    justify-content: center;
  }
  .GameGridRow > div.Player > img {
    position: absolute;
    height: 35px;
    margin-left: 0.5%;
  }
  .GameGridRow > div.Player {
    background-color: aqua;
  }
`;

export default GameGrid;
