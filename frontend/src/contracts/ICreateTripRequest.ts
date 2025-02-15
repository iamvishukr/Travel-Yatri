export interface ICreateTripRequest {
  place: string[];
  hotels: string[];
  startDate: string;
  endDate: string;
  pickUp: string;
  pickUpTime: string;
  cancellationPolicy: string[];
  termsAndConditions: string[];
  // enquiryNumber: string;
  price: number | null;
  inclusions: string[];
  exclusions: string[];
  itinerary: Iitinerary[];
  photos: string[];
  pickUpPointLong: number;
  pickUpPointLat: number;
  totalSeats: number;
  price_Single?: string;
  price_Double?: string;
  price_Triple?: string;
  price_Quad?: string;
  roomSharing?: {
    single?: number | null;
    double?: number | null;
    triple?: number | null;
    quad?: number | null;
  };
}

export interface Iitinerary {
  day: number;
  // description: [string];
  description: string[];
}

export interface IUpdateTripRequest extends Partial<ICreateTripRequest> {
  _id: string;
}
