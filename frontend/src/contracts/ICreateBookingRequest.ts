import { ITripUsers } from "./IBookingResponse";

export interface ICreateBookingRequest {
  users: ITripUsers[];
  note: string;
  organizerId: string;
  tripId: string;
  roomSharing?: string
}
