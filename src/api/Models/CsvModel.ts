import { Model, model, Schema } from "mongoose";
import { CsvModel } from "../Interface/csv.interface";
export const optionalaSchma: object = {
    timestamp: {
        createdAt: "createdOn",
        updatedAt: "updatedOn"
    }
};
const schema = new Schema({
    agent: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        require: true
    },
    policyMode: {
        type: Number,
        require: true
    },
    producer: {
        type: String,
        require: true
    },
    policyNumber: {
        type: String,
        require: true
    },
    premiumAmountWritten: {
        type: String,
        require: true
    },
    premiumAmount: {
        type: String,
        require: true
    },
    policyType: {
        type: String,
        require: true
    },
    companyName: {
        type: String,
        require: true
    },
    categoryName: {
        type: String,
        require: true
    },
    policyStartDate: {
        type: String,
        require: true
    },
    policyEndDate: {
        type: String,
        require: true
    },
    csr: {
        type: String,
        require: true
    },
    accountName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    accountType: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    primary: {
        type: String,
        require: true
    },
    ApplicationId: {
        type: String,
        require: true
    },
    agencyId: {
        type: String,
        require: true
    },
    hasActiveClientPolicy: {
        type: String,
        require: true
    },
}, optionalaSchma);

export const csv: Model<CsvModel> = model<CsvModel>('csv', schema, 'csv');
