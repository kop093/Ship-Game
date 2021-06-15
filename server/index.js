const express = require("express");
const uuid = require("uuid").v4;
require("dotenv").config();
const { games } = require("./mongo");

const app = express();

app.use(express.static("public"));

app.get("/test", (req, res) => {
  return res.send("taco");
});

// app.put("/game/enemy/:level", (req, res) => {
//   const params = req.params;

//   let enemyMax = 5 + 5 * params;
//   let enemy = {};
//   let num = 0;
//   while (num <= enemyMax) {
//     let enemyX = Math.floor(Math.random());
//   }
// });

// app.put("/game/player/find", (req, res) => {
//   games().findOneAndUpdate(
//     {},
//     {
//       $inc: {
//         canonOnShip: 1,
//       },
//     },
//     { returnNewDocument: true, upsert: true },
//     function (err, response) {
//       if (err) {
//         res.json(0);
//       } else {
//         res.json(response.value);
//         return;
//       }
//     }
//   );
// });

app.put("/game/player/move/:direction/:canonFound/:enemyFight", (req, res) => {
  const params = req.params;
  let canonNum = parseInt(params.canonFound);
  let enemyNum = parseInt(params.enemyFight);
  let arrIndex;
  // console.log(params.canonFound);

  let xDir = 0;
  let yDir = 0;
  let canonInc = 0;
  let enemyInc = 0;

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

  if (canonNum >= 0) {
    canonInc = 1;
    arrIndex = `canonOnMap.${canonNum}`;
  }

  if (enemyNum >= 0) {
    enemyInc = -1;
    arrIndex = `enemy.${enemyNum}`;
  }

  games().update({}, { $unset: { [arrIndex]: 1 } });
  games().update({}, { $pull: { canonOnMap: null } });
  games().findOneAndUpdate(
    {},
    {
      $inc: {
        playerX: xDir,
        playerY: yDir,
        canonOnShip: canonInc,
      },
    },
    { returnOriginal: false, upsert: true },
    function (err, response) {
      if (err) {
        res.json(0);
      } else {
        console.log(response.value);
        res.json(response.value);
        return;
      }
    }
  );
});

app.post("/game", (req, res) => {
  //calling this endpoint creates a new game
  const id = uuid();
  const playerX = 13;
  const playerY = 1;
  const gameWidth = 25;
  const gameHeight = 15;
  let enemy = [
    { enemyX: 3, enemyY: 3 },
    { enemyX: 6, enemyY: 6 },
    { enemyX: 14, enemyY: 4 },
    { enemyX: 17, enemyY: 7 },
    { enemyX: 10, enemyY: 5 },
    { enemyX: 22, enemyY: 5 },
    { enemyX: 22, enemyY: 8 },
    { enemyX: 12, enemyY: 9 },
    { enemyX: 7, enemyY: 12 },
    { enemyX: 17, enemyY: 11 },
  ];
  let canonOnShip = 3;
  let canonOnMap = [
    { canonX: 3, canonY: 8 },
    { canonX: 8, canonY: 9 },
    { canonX: 5, canonY: 19 },
    { canonX: 9, canonY: 3 },
    { canonX: 10, canonY: 9 },
  ];
  const gameObject = {
    gameId: id,
    playerX,
    playerY,
    gameWidth,
    gameHeight,
    enemy: enemy,
    canonOnShip,
    canonOnMap: canonOnMap,
  };

  games().remove();
  games().insertOne({ ...gameObject, _id: id });

  res.json(gameObject);
});

app.listen(8000, () => console.log("lisenting on port 8000"));
