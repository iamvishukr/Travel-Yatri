export interface IGetOrganizerResponse {
    id: string;
    agencyName: string;
    business: string;
    email: string;
    address: string;
    website?: string; // Optional field
    contactNumber: string;
    dialCode: string;
    aadhaarNumber: string;
    panNumber: string;
    gstNumber: string;
    adhaarImage?: string; // Optional field
    panImage?: string; // Optional field
    description?: string; // Optional field
    createdAt: Date;
    updatedAt: Date;
  }