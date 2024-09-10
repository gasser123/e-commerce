import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
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
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { SignupDto } from "./dtos/signup.dto";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";

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

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  getUsers() {
    return "get users";
  }

  @Get("/:id")
  @UseGuards(AuthGuard, AdminGuard)
  getUser(@Param("id", ParseIntPipe) id: number) {
    return "get user with id = " + id;
  }

  @Delete("/:id")
  @UseGuards(AuthGuard, AdminGuard)
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return "delete user with id = " + id;
  }

  // admin updates user info
  @Patch("/:id")
  @UseGuards(AuthGuard, AdminGuard)
  updateUser(@Param("id", ParseIntPipe) id: number) {
    return "admin updates user with id = " + id;
  }
}
