import { Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import URL from "../model/url";
import { BadRequestError } from "../errors/bad-request-error";

async function createShortURL(req: Request, res: Response) {
	const body = req.body as { url: string };

	if (!body.url) throw new BadRequestError("URL is required");

	const { randomUUID } = new ShortUniqueId({ length: 10 });
	const shortId = randomUUID();

	const newURL = new URL({
		shortId,
		redirectURL: body.url,
		visitHistory: []
	});

	await newURL.save();

	return res.json({ id: shortId });
}

async function getReport(req: Request, res: Response) {
	const shortId = req.params.shortId;
	const result = await URL.findOne({ shortId });

	if (!result) throw new BadRequestError("URL not found");

	return res.json({
		totalClicks: result.visitHistory.length,
		analytics: result.visitHistory
	});
}

export { createShortURL, getReport };
