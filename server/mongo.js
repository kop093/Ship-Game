const { MongoClient } = require("mongodb");

// Connection URI
const uri = process.env.MONGO_URL;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let games;

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("final-project-game");

    // Establish and verify connection
    await db.command({ ping: 1 });

    console.log("Connected successfully to database server");

    games = db.collection("games");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); never close connection
  }
}

run().catch(console.dir);

module.exports = { games: () => games };
