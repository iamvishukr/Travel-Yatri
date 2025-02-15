import { IGetTripResponse } from "./IGetTripResponse";
import { IUser } from "./IUser";

export interface IBooking {
  bookingStatus: string;
  createdAt: string;
  organizerId: string | IUser;
  tripId: string | IGetTripResponse;
  updatedAt: string;
  user: string;
  users: ITripUsers[];
  _id: string;
  costPerPerson: number;
  totalCost: number;
  razorpayOrderId: number;
  orderCreationId: number;
  razorpayPaymentId: number;
  tripStarted: string;
}

interface IOrder {
  amount: string;
  amount_due: string;
  amount_paid: string;
  attempts: string;
  created_at: string;
  currency: string;
  entity: string;
  id: string;
  notes: string;
  offer_id: string;
  receipt: string;
  status: string;
}

export interface ITripUsers {
  name: string;
  email: string;
  contactNumber: string;
  age: string;
}

export interface IBookingResponse {
  data: {
    booking: IBooking;
    order: IOrder;
  };
  message: string;
}
