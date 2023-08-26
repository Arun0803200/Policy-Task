import { Model, model, Schema } from "mongoose";
import { CarrierModel } from "../Interface/carrier.interface.";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const carrierSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
}, optionalaSchma);

export const carrier: Model<CarrierModel> = model<CarrierModel>('carrier', carrierSchema, 'carrier');
