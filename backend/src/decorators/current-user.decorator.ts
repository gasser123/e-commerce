import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from "@nestjs/common";
import { CustomRequest } from "src/interfaces/custom-request.interface";
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    if (!request.currentUser) {
      throw new InternalServerErrorException("user credentials not found");
    }
    return request.currentUser;
  },
);
