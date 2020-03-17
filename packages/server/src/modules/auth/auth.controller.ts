import { Controller, Post, Request, Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard, LocalAuthGuard } from "./guards";
import { SignInResponse, SignUpBody } from "./auth.dto";
import { User } from "../user";

@Controller("auth")
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post("sign-in")
  @UseGuards(LocalAuthGuard)
  signIn(@Request() request: any): SignInResponse {
    const user: User = request.user;
    return this.authService.signIn(user);
  }

  @Post("sign-up")
  async signUp(@Body() body: SignUpBody): Promise<void> {
    await this.authService.signUp(body);
  }

  @Post("whoami")
  @UseGuards(JwtAuthGuard)
  whoami(@Request() request) {
    const user: User = request.user;
    return user.username;
  }
}
