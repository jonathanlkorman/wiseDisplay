import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INFLPlay extends Document {
  _id: string;
  text: string;
  abbreviation: string;
}

export const schema = new Schema<INFLPlay>({
  _id: { type: String, required: true },
  text: { type: String, required: true },
  abbreviation: { type: String, required: true }
});


export const NFLPlayModel: Model<INFLPlay> = mongoose.model<INFLPlay>('nflPlay', schema);