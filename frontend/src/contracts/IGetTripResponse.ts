import { Iitinerary } from "./ICreateTripRequest";
import { IGetOrganizerResponse } from "./IGetOrganizerResponse"; // Import the IGetOrganizerResponse interface

type Photo = {
  path: string;
  _id: string;
};

export interface IGetTripResponse {
  _id: string;
  agencyInfo: { email: string; fullName: string; _id: string }[];
  business: string;
  organizerId: string;
  organizer_details?: IGetOrganizerResponse;
  place: string[];
  hotels: string[];
  photos: Photo[];
  startDate: string;
  endDate: string;
  pickUp: string;
  pickUpTime: string;
  cancellationPolicy?: string[];
  roomSharing?: {
    single?: number;
    double?: number;
    triple?: number;
    quad?: number;
  };
  price: number;
  itinerary: Iitinerary[];
  isFirstBookingDone: boolean;
  exclusions: string[];
  isExpired: boolean;
  inclusions: string[];
  enquiryNumber: string;
  batches: [];
  termsAndConditions: string[];
  createdAt: string;
  updatedAt: string;
  leftSeats: number;
  totalSeats: number;
  pickUpPointLong: string;
  pickUpPointLat: string;
}