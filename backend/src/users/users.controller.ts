import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { AdminGuard } from "src/auth/guards/admin.guard";
import { SignupDto } from "./dtos/signup.dto";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { AdminUpdateUserDto } from "./dtos/admin-update-user.dto";

@Controller("users")
export class UsersController {
  usersService: UsersService;
  authService: AuthService;
  constructor(usersService: UsersService, authService: AuthService) {
    this.usersService = usersService;
    this.authService = authService;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async register(
    @Body() body: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.signup(body);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
          ? false
          : true,
      sameSite: "strict",
      maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
    });

    return user;
  }
  // ClassSerializerInterceptor uses instanceToPlain function in class-transformer
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("/login")
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;
    const { user, token } = await this.authService.signin(email, password);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
          ? false
          : true,
      sameSite: "strict",
      maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days
    });

    return user;
  }

  @Post("/logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "test"
          ? false
          : true,
    });

    return { message: "Logged out successfully" };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/profile")
  @UseGuards(AuthGuard)
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch("/profile")
  @UseGuards(AuthGuard)
  updateProfile(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateProfile(user.id, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  @UseGuards(AuthGuard, AdminGuard)
  async getUser(@Param("id", ParseIntPipe) id: number) {
    const user = await this.usersService.getUser({ id });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete("/:id")
  @UseGuards(AuthGuard, AdminGuard)
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  // admin updates user info
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch("/:id")
  @UseGuards(AuthGuard, AdminGuard)
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: AdminUpdateUserDto,
  ) {
    return this.authService.updateUser(id, body);
  }
}
