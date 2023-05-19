import mongoose, { ConnectOptions } from "mongoose";
import { beforeAll, afterAll } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();
let mongo;
// Make the connection to a fake database
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongooseOpts as ConnectOptions);
});
// Disconnection the fake database
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  await mongo.stop();
});
