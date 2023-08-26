import { Model, model, Schema } from "mongoose";
import { AgentModel } from "../Interface/agent.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    salary: {
        type: String,
        require: true
    }
}, optionalaSchma);

export const agent: Model<AgentModel> = model<AgentModel>('agent', schema, 'agent');
