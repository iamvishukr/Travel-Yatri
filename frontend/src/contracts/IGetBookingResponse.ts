import { IBooking } from "./IBookingResponse";
import { IPaginationMeta } from "./IPaginationMeta";

export interface IGetBookingResponse{
    data: IBooking[] ,
    meta: IPaginationMeta    
}