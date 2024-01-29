import express, { Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found";
import URLRouter from "./routes/url";
import redirectionRoute from "./routes/redirect";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/",redirectionRoute);

app.use("/url", URLRouter);

app.all("*", async (_req: Request, _res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
