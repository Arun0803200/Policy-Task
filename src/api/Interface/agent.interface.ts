import { Document } from "mongoose";

export interface Agent {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dob: string;
    department: string;
    position: string;
    salary: number;
}

export interface AgentModel extends Agent, Document {}