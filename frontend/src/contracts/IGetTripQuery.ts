import { Value } from "../pages/Dashboard/GetBooking";

export interface IGetTripQuery {
  place?: string;
  dateRange?: Value;
  isExpired?: boolean; 
  userLat?: string;
  userLong?: string;
}
