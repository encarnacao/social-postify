import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = this.userService.checkToken((authorization ?? "").split(" ")[1]);
      const user = await this.userService.getUserByEmail(data.email);
      if(!user) throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
      delete user.password;
      request.user = user;
    } catch (error) {
      throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

}