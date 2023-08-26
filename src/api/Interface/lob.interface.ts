import { Document } from "mongoose";

export interface Lob {
    name: string;
    description: string;
    annualRevenue: number;
}

export interface LobModel extends Lob, Document {}
