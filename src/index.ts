import express, { Request, Response } from "express";
import * as dotenv from "dotenv";

import { PrudentialController } from "./controller";
import logger from "./helpers/logger";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/jwt", (req: Request, res: Response) => {
  return PrudentialController.JWT(req, res);
});

app.listen(3000, () => {
  logger.getDate();
});
