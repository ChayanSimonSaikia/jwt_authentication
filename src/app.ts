import express, { Application } from "express";
import config from "config";
import morgan from "morgan";
import logger from "./utils/logger";
import { routes } from "./routes/index.routes";
import connect from "./utils/init_mongodb";

const app: Application = express();
app.use(express.json());
app.use(morgan("dev"));

const port = config.get<number>("PORT");
app.listen(port, () => {
  logger.info(`Server is running on PORT: ${port}`);
  connect();
  routes(app);
});
