const express = require("express");
const uuid = require("uuid").v4;
require("dotenv").config();
const { games } = require("./mongo");

const app = express();

app.use(express.static("public"));

app.get("/test", (req, res) => {
  return res.send("taco");
});

app.put("/game/:level", (req, res) => {
  const params = req.params;
  let levelValue = parseInt(params.level);

  //calling this endpoint creates a next level
  const level = levelValue + 1;
  let key = -1;
  const playerX = 13;
  const playerY = 1;
  const gameWidth = 25;
  const gameHeight = 15 + levelValue * 2;
  let defeat = false;
  let eMax = 10;
  let canonMax = 10;
  let enemy = [];
  let canonOnMap = [];

  //enemy coords
  let num = 0;
  while (num < eMax) {
    let randNumX = Math.floor(Math.random() * gameWidth);
    let randNumY = Math.floor(Math.random() * gameHeight);

    if (enemy.length === 0) {
      enemy.push({ enemyX: randNumX, enemyY: randNumY });
      num++;
    }
    let unique = true;
    enemy.forEach((e) => {
      if (e.enemyX === randNumX && e.enemyY === randNumY) {
        if (randNumX < gameWidth - 1 && randNumY < gameHeight - 1) {
          unique = false;
        }
      }
    });
    if (unique) {
      enemy.push({ enemyX: randNumX, enemyY: randNumY });
      num++;
    }
  }

  //cannon coods
  num = 0;
  while (num < canonMax) {
    let randNumX = Math.floor(Math.random() * gameWidth + 1);
    let randNumY = Math.floor(Math.random() * gameHeight + 1);

    if (canonOnMap.length === 0) {
      canonOnMap.push({ canonX: randNumX, canonY: randNumY });
      num++;
    }
    let unique = true;
    canonOnMap.forEach((e) => {
      if (e.canonX === randNumX && e.canonY === randNumY) {
        if (randNumX < gameWidth - 1 && randNumY < gameHeight - 1) {
          unique = false;
        }
      }
    });

    enemy.forEach((e) => {
      if (e.enemyX === randNumX && e.enemyY === randNumY) {
        if (randNumX < gameWidth - 1 && randNumY < gameHeight - 1) {
          unique = false;
        }
      }
    });

    if (unique) {
      canonOnMap.push({ canonX: randNumX, canonY: randNumY });
      num++;
    }
  }
  let islandKey = Math.floor(Math.random() * enemy.length);
  let canonOnShip = 3;

  const gameObject = {
    level,
    islandKey,
    key: key,
    playerX,
    playerY,
    gameWidth,
    gameHeight,
    defeat,
    enemy: enemy,
    canonOnShip,
    canonOnMap: canonOnMap,
  };

  games().remove();
  games().insertOne({ ...gameObject });

  res.json(gameObject);
});

app.put(
  "/game/player/move/:direction/:canonFound/:enemyFight/:key/:canonOnShip",
  (req, res) => {
    const params = req.params;
    let canonNum = parseInt(params.canonFound);
    let enemyNum = parseInt(params.enemyFight);
    let canonOnShip = parseInt(params.canonOnShip);
    let key = parseInt(params.key);
    let arrIndex;
    let defeat = 0;
    // console.log(params.canonFound);

    let xDir = 0;
    let yDir = 0;
    let canonInc = 0;
    let enemyInc = 0;
    let keyInc = 0;

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
      arrIndex = `enemy.${enemyNum}`;

      let inter = 0;

      while (inter === 0) {
        let randInter = Math.floor(Math.random() * 2);
        canonInc = canonInc - 1;
        if (randInter === 1) {
          canonInc = canonInc + 1;
          inter++;
        }
        if (canonOnShip + canonInc < 0) {
          console.log("defeated");
          defeat = 1;
          inter++;
        }

        console.log(canonInc);
      }
    }
    if (key === 1) {
      keyInc = 1;
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
          key: keyInc,
          defeat: defeat,
        },
      },
      { returnOriginal: false, upsert: true },
      function (err, response) {
        if (err) {
          res.json(0);
        } else {
          // console.log(response.value);
          res.json(response.value);
          return;
        }
      }
    );
  }
);

app.post("/game", (req, res) => {
  //calling this endpoint creates a new game
  const id = uuid();
  const level = 1;
  const playerX = 13;
  const playerY = 1;
  const gameWidth = 25;
  const gameHeight = 15;
  let defeat = 0;
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
  // let islandKey = Math.floor(Math.random() * enemy.length);
  let islandKey = 2;
  let key = 0;
  let canonOnShip = 3;
  let canonOnMap = [
    { canonX: 3, canonY: 8 },
    { canonX: 18, canonY: 9 },
    { canonX: 14, canonY: 6 },
    { canonX: 9, canonY: 3 },
    { canonX: 10, canonY: 9 },
    { canonX: 18, canonY: 4 },
    { canonX: 20, canonY: 7 },
    { canonX: 15, canonY: 9 },
    { canonX: 7, canonY: 8 },
    { canonX: 5, canonY: 4 },
  ];
  const gameObject = {
    gameId: id,
    level,
    islandKey,
    key,
    playerX,
    playerY,
    gameWidth,
    gameHeight,
    defeat,
    enemy: enemy,
    canonOnShip,
    canonOnMap: canonOnMap,
  };

  games().remove();
  games().insertOne({ ...gameObject, _id: id });

  res.json(gameObject);
});

app.listen(8000, () => console.log("lisenting on port 8000"));
