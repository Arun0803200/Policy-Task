import { Model, model, Schema } from "mongoose";
import { LobModel } from "../Interface/lob.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    annualRevenue: {
        type: Number,
        require: true
    },
}, optionalaSchma);

export const lob: Model<LobModel> = model<LobModel>('lob', schema, 'lob');
