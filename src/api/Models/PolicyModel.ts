import { Model, model, Schema} from "mongoose";
import { PolicyModel } from "../Interface/policy.interface";

export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};

export const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    carrierId: {
        type: String,
        required: true
    },
    lobId: {
        type: String,
        required: true
    },
    policyNumber: {
        type: String,
        required: false
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: false
    }
}, optionalaSchma);

export const policy:Model<PolicyModel> = model<PolicyModel>('policy', schema, 'policy');
