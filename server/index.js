const express = require("express");
const uuid = require("uuid").v4;
require("dotenv").config();
const { games } = require("./mongo");

const app = express();

app.use(express.static("public"));

app.get("/test", (req, res) => {
  return res.send("taco");
});

app.put("/game/enemy/:level", (req, res) => {
  const params = req.params;
});

app.put("/game/player/move/:direction", (req, res) => {
  const params = req.params;

  let xDir = 0;
  let yDir = 0;
  switch (params.direction) {
    case "east":
      xDir = 1;
      yDir = 0;
      break;
    case "west":
      xDir = -1;
      yDir = 0;
      break;
    case "north":
      xDir = 0;
      yDir = -1;
      break;
    case "south":
      xDir = 0;
      yDir = 1;
      break;
    default:
      xDir = 0;
      yDir = 0;
  }

  games().findOneAndUpdate(
    {},
    {
      $inc: {
        playerX: xDir,
        playerY: yDir,
      },
    },
    { returnOriginal: false, upsert: true },
    function (err, response) {
      if (err) {
        res.json(0);
      } else {
        console.log(response.value);
        console.log(`${xDir}`);
        res.json(response.value);
        return;
      }
    }
  );
});

app.post("/game", (req, res) => {
  //calling this endpoint creates a new game
  const id = uuid();
  const playerX = 5;
  const playerY = 5;
  const gameWidth = 25;
  const gameHeight = 20;

  const gameObject = {
    gameId: id,
    playerX,
    playerY,
    gameWidth,
    gameHeight,
  };

  games().remove();
  games().insertOne({ ...gameObject, _id: id });

  res.json(gameObject);
});

app.listen(8000, () => console.log("lisenting on port 8000"));
