import { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import URL from "../model/url";

export async function redirectUser(req: Request, res: Response) {
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
}
