import { Model, model, Schema } from "mongoose";
import { User } from "../Interface/user.interface";
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
    email: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
}, optionalaSchma);

export const user: Model<User> = model<User>('user', schema, 'user');
