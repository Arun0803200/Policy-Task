import { Document } from "mongoose";

export interface CarrierInterface {
    name: string;
    country: string
    rating: number;
}

export interface CarrierModel extends CarrierInterface, Document {}