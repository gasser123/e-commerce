import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dtos/signup.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { AdminUpdateUserDto } from "./dtos/admin-update-user.dto";
@Injectable()
export class AuthService {
  usersService: UsersService;
  configService: ConfigService;
  jwtService: JwtService;
  constructor(
    usersService: UsersService,
    configService: ConfigService,
    jwtService: JwtService,
  ) {
    this.usersService = usersService;
    this.configService = configService;
    this.jwtService = jwtService;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.getUser({ email });
    if (!user) {
      throw new UnauthorizedException("invalid email or password");
    }
    const BCRYPT_PASSWORD =
      this.configService.getOrThrow<string>("BCRYPT_PASSWORD");
    const check = bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password);
    if (check) {
      const payload = { userId: user.id };
      const token = this.jwtService.sign(payload);
      return { user, token };
    } else {
      throw new UnauthorizedException("invalid email or password");
    }
  }

  async signup(signupDto: SignupDto) {
    const { email, name, password } = signupDto;
    const existingUser = await this.usersService.getUser({ email });
    if (existingUser) {
      throw new BadRequestException("email already exists");
    }
    const BCRYPT_PASSWORD =
      this.configService.getOrThrow<string>("BCRYPT_PASSWORD");
    const SALT_ROUNDS = this.configService.getOrThrow<string>("SALT_ROUNDS");
    const hash = bcrypt.hashSync(
      password + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS),
    );
    const user = await this.usersService.createUser({
      email,
      name,
      password: hash,
    });
    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload);
    return { user, token };
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto) {
    const { email, name, password } = updateUserDto;
    const existingUser = await this.usersService.getUser({ email });
    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException("email already exists");
    }
    if (password) {
      const BCRYPT_PASSWORD =
        this.configService.getOrThrow<string>("BCRYPT_PASSWORD");
      const SALT_ROUNDS = this.configService.getOrThrow<string>("SALT_ROUNDS");
      const hash = bcrypt.hashSync(
        password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS),
      );
      return this.usersService.updateUser(id, { email, name, password: hash });
    } else {
      return this.usersService.updateUser(id, { email, name });
    }
  }

  async updateUser(id: number, adminUpdateUserDto: AdminUpdateUserDto) {
    const user = await this.usersService.getUser({ id });
    if (!user) {
      throw new NotFoundException("user not found");
    }

    if (user.isAdmin) {
      throw new BadRequestException("can't update an admin user");
    }
    const existingUser = await this.usersService.getUser({
      email: adminUpdateUserDto.email,
    });
    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException("email already exists");
    }

    return this.usersService.updateUser(id, adminUpdateUserDto);
  }
}
