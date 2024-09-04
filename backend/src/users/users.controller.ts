import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";

@Controller("users")
export class UsersController {
  @Post()
  register() {
    return "register";
  }

  @Post("/login")
  login(@Body() body: LoginDto) {
    return body;
  }

  @Post("/logout")
  logout() {
    return "logout";
  }

  @Get("/profile")
  getProfile() {
    return "get profile";
  }

  @Patch("/profile")
  updateProfile() {
    return "update profile";
  }

  @Get()
  getUsers() {
    return "get users";
  }

  @Get("/:id")
  getUser(@Param("id", ParseIntPipe) id: number) {
    return "get user with id = " + id;
  }

  @Delete("/:id")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return "delete user with id = " + id;
  }

  // admin updates user info
  @Patch("/:id")
  updateUser(@Param("id", ParseIntPipe) id: number) {
    return "admin updates user with id = " + id;
  }
}
