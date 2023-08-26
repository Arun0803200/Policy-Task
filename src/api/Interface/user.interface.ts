import { Document } from "mongoose";

export interface User {
    name: string;
    email: string;
    dob: string;
    address: string;
    phoneNumber: string;
}

export interface  UserModel extends User, Document {}