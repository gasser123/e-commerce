import { User } from "../user.entity";

export class GetUsersDto {
  users: User[];
  page: number;
  pages: number;
  constructor(getUsersInfo: Partial<GetUsersDto>) {
    Object.assign(this, getUsersInfo);
  }
}
