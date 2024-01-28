import express, { Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found";
import URLRouter from "./routes/url";
import URL from "./model/url";
import { BadRequestError } from "./errors/bad-request-error";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/url", URLRouter);

app.get("/:shortId", async (req: Request, res, Response) => {
	const shortId = req.params.shortId;
	const entry = await URL.findOneAndUpdate(
		{
			shortId
		},
		{
			$push: {
				visitHistory: {
					timestamp: Date.now()
				}
			}
		}
	);
	if (!entry) throw new BadRequestError("URL not found");

	res.redirect(entry.redirectURL);
});

app.all("*", async (_req: Request, _res: Response) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export default app;
