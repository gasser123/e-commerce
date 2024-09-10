import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { CustomRequest } from "src/interfaces/custom-request.interface";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    if (request.currentUser && request.currentUser.isAdmin) {
      return true;
    }
    return false;
  }
}
