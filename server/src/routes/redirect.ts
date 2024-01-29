import express from "express";
import { redirectUser } from "../controllers/redirect";

const redirectionRoute = express.Router();

redirectionRoute.get("/:shortId", redirectUser);

export default redirectionRoute;
