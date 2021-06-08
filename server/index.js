const express = require("express");
const uuid = require("uuid").v4;
require("dotenv").config();
const { games } = require("./mongo");

const app = express();

app.get("/test", (req, res) => {
  return res.send("taco");
});

app.post("/game", (req, res) => {
  //calling this endpoint creates a new game
  const id = uuid();

  //   console.log(games());

  games().remove();
  games().insertOne({ _id: id });

  res.json({ id });
});

app.listen(8000, () => console.log("lisenting on port 8000"));
