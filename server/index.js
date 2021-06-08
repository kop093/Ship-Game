const express = require("express");
const uuid = require("uuid").v4;
require("dotenv").config();
const { games } = require("./mongo");

const app = express();

app.get("/test", (req, res) => {
  return res.send("taco");
});

app.put("/game/player/move/:direction", (req, res) => {
  console.log(req.params);
  const id = uuid();
  const playerX = 15;
  const playerY = 15;
  const enemyX = 10;
  const enemyY = 10;
  const gameWidth = 25;
  const gameHeight = 20;

  const gameObject = {
    gameId: id,
    playerX,
    playerY,
    enemyX,
    enemyY,
    gameWidth,
    gameHeight,
  };

  games().remove();
  games().insertOne({ ...gameObject, _id: id });

  res.json(gameObject);
});

app.post("/game", (req, res) => {
  //calling this endpoint creates a new game
  const id = uuid();
  const playerX = 5;
  const playerY = 5;
  const enemyX = 10;
  const enemyY = 10;
  const gameWidth = 25;
  const gameHeight = 20;

  const gameObject = {
    gameId: id,
    playerX,
    playerY,
    enemyX,
    enemyY,
    gameWidth,
    gameHeight,
  };

  games().remove();
  games().insertOne({ ...gameObject, _id: id });

  res.json(gameObject);
});

app.listen(8000, () => console.log("lisenting on port 8000"));
