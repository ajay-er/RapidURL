import { Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import URL,{IURL} from "../model/url";
import { BadRequestError } from "../errors/bad-request-error";

async function createShortURL(req: Request, res: Response) {
    const body = req.body as { url: string };
  
    if (!body.url) {
      return res.status(400).json({ error: "url is required" });
    }
  
    const shortID = new ShortUniqueId();

    console.log(shortID);
  
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    } as unknown as IURL);
  
    return res.json({ id: shortID });
  }

  
  async function getReport(req: Request, res: Response) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
  
    if (!result) throw new BadRequestError("URL not found")
  
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }
  
  export { createShortURL, getReport };