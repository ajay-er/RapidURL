import mongoose, { Schema, Document } from "mongoose";

interface IVisitHistory {
	timestamp: number;
}

export interface IURL extends Document {
	shortId: string;
	redirectURL: string;
	visitHistory: IVisitHistory[];
}

const urlSchema: Schema<IURL> = new mongoose.Schema(
	{
		shortId: {
			type: String,
			required: true,
			unique: true
		},
		redirectURL: {
			type: String,
			required: true
		},
		visitHistory: [{ timestamp: { type: Number } }]
	},
	{ timestamps: true }
);

const URL = mongoose.model<IURL>("url", urlSchema);

export default URL;
