import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = () => {
  mongoose
    .connect(config.get<string>("DB_URI"), {
      dbName: config.get<string>("DB_NAME"),
    })
    .then(() => {
      logger.info("Connected to MongoDB");
    })
    .catch((err) => {
      logger.error("Something went wrong in DB", err);
      process.exit(1);
    });
};
mongoose.connection.on("disconnected", () =>
  console.log("MongoDB disconnected")
);

process.on("SIGINT", () => {
  mongoose.disconnect().then(() => {
    process.exit(1);
  });
});

export default connect;
