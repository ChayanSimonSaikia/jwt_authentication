import { createClient } from "redis";
import logger from "./logger";

const client = createClient();

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
})();

client.on("connect", () => logger.info("Redis client Connected"));
client.on("end", () => logger.warn("Redis client disconnected"));
client.on("error", (err) => {
  logger.error(err);
  process.exit(1);
});

process.on("SIGINT", () => {
  client.quit();
  process.exit(1);
});

export default client;
