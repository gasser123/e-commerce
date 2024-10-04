import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class UsersService {
  repo: Repository<User>;
  constructor(@InjectRepository(User) repo: Repository<User>) {
    this.repo = repo;
  }

  getAllUsers(): Promise<User[]> {
    return this.repo.find();
  }

  getUser(userInfo: Partial<User>): Promise<User | null> {
    return this.repo.findOneBy(userInfo);
  }

  createUser(userInfo: Partial<User>) {
    const user = this.repo.create(userInfo);
    return this.repo.save(user);
  }

  async updateUser(id: number, userInfo: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("user not found");
    }

    Object.assign(user, userInfo);

    return this.repo.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.isAdmin) {
      throw new BadRequestException("Can't delete an admin user");
    }

    if (user.orders.length > 0) {
      throw new BadRequestException(
        "Can't delete a user referenced in an order",
      );
    }
    return this.repo.remove(user);
  }
}
