import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
  jwtService: JwtService;
  configService: ConfigService;
  usersService: UsersService;
  constructor(
    jwtService: JwtService,
    configService: ConfigService,
    usersService: UsersService,
  ) {
    this.jwtService = jwtService;
    this.configService = configService;
    this.usersService = usersService;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies["jwt"];
    if (!token) {
      throw new UnauthorizedException();
    }
    const tokenSecret = this.configService.getOrThrow<string>("JWT_SECRET");
    try {
      const payload = this.jwtService.verify(token, {
        secret: tokenSecret,
      });
      const user = await this.usersService.getUser({ id: payload.userId });
      if (!user) {
        throw new UnauthorizedException();
      }
      request["currentUser"] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
