import { IUser } from "./IUser";

export interface IAdminUserResponse{
    data: IUser[];
    meta: IPaginationMeta
}

export interface IPaginationMeta{
    page: number;
    pageCount: number;
    perPage: number;
    total: number;
}