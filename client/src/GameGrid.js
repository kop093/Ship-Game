import React, { useEffect } from "react";

const GameGrid = (props) => {
  const { game } = props;
  const { playerX, playerY } = game;

  let rows = [];
  for (let row = 1; row <= game.gameHeight; row++) {
    let cols = [];
    for (let col = 1; col <= game.gameWidth; col++) {
      let classNames = "";

      if (row === playerY && col === playerX) {
        classNames = "Player";
      }
      const id = `cell-${row}-${col}`;
      cols.push(<div key={id} className={classNames} id={id}></div>);
    }
    rows.push(
      <div key={`row-${row}`} className="GameGridRow">
        {cols}
      </div>
    );
  }

  return <div className="GameGrid">{rows}</div>;
};

export default GameGrid;
