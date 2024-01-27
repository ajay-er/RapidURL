import express, { Request, Response } from "express";
import morgan from "morgan";
import "express-async-errors";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found";

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.all("*", async (_req: Request, _res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
