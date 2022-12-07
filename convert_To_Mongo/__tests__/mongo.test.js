const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function startDbServer() {
  const mongoServer = await MongoMemoryServer.create();

  mongoose.connect(mongoServer.getUri());

  mongoose.connection.on("error", err => {
    // if (err.message.code === "ETIMEDOUT") {
    //   console.log(err);
    //   mongoose.connect(mongoUri);
    // }
    console.log(err);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
}


module.exports = startDbServer;