import { TADMIN, TOrganizer, TUSER } from "./constants/roleConstant";
import { IOrganizer } from "./IOrganizer";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  // role: string;
  role: TOrganizer | TUSER | TADMIN;
  isVerified: boolean;
  isDeleted: boolean;
  isVerificationSubmitted: boolean;
  organizer: IOrganizer;
  contactNumber: string;
}
