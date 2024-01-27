import express from "express";
import { createShortURL, getReport } from "../controllers/url";

const URLRouter = express.Router();

URLRouter.post("/", createShortURL);

URLRouter.get("/report/:shortId", getReport);

export default URLRouter;
