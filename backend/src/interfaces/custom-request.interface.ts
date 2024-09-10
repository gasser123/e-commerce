import { Request } from "express";
import { User } from "src/users/user.entity";

export interface CustomRequest extends Request {
  currentUser?: User;
}
