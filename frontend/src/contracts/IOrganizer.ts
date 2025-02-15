import { IFileResponse } from "./IFileResponse";

export interface IOrganizer{
    _id: string;
    user: string;
    address: string;
    website: string;
    contactNumber: string;
    aadhaarNumber: string;
    panNumber: string;
    gstNumber: string;
    adhaarImage: IFileResponse,
    panImage: IFileResponse,
    description: string,
}