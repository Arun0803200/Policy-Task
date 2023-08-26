import { Model, model, Schema } from "mongoose";
import { UserAccountModel } from "../Interface/userAccount.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    userId: {
        type: String,
        require: true
    },
    accountNumber: {
        type: String,
        require: true
    },
    balance: {
        type: String,
        require: true
    }
}, optionalaSchma);

export const userAccount: Model<UserAccountModel> = model<UserAccountModel>('userAccount', schema, 'userAccount');
