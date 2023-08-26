import { Document } from "mongoose";

export interface UserAccountInterface {
    userId: string;
    accountNumber: string;
    balance: number;
}

export interface UserAccountModel extends UserAccountInterface, Document {}
