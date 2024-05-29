import { FirestoreIdBaseModel } from "..";
import { RoleEnum } from "../enums";

export type UserModel = {
  role: RoleEnum;
  name: string;
  email: string;
};
export type UserIdModel = FirestoreIdBaseModel<UserModel>;
