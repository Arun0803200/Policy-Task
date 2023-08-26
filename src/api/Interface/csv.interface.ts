import { Document } from "mongoose";

export interface Csv {
    agent: string;
    userType: string;
    policyMode: number;
    producer: string;
    policyNumber: string;
    premiumAmountWritten: any;
    premiumAmount: any;
    policyType: string;
    companyName: string;
    categoryName: string;
    policyStartDate: string;
    policyEndDate: string;
    csr: string;
    accountName: string;
    email: string;
    gender: string;
    firstName: string;
    city: string;
    accountType: string;
    phone: any;
    address: string;
    state: string;
    zip: string;
    dob: string;
    primary: any;
    ApplicationId: any;
    agencyId: any;
    hasActiveClientPolicy: any;
}

export interface CsvModel extends Csv, Document {}