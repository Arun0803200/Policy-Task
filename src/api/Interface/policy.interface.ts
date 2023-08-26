import { Document } from "mongoose";

export interface Policy {
    userId: string;
    carrierId: string;
    lobId: string;
    policyNumber: string;
    startDate: string;
    endDate: string;
}

export interface PolicyModel extends Document, Policy {}
