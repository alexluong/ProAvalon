import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInBody, SignInResponse, SignUpBody } from "./auth.dto";
import { User, UserService } from "../user";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(body: SignInBody): Promise<User> {
    const user = await this.userService.findOne({ username: body.username });
    const isValidPassword = await user.comparePassword(body.password);
    if (user && isValidPassword) {
      return user;
    } else {
      return null;
    }
  }

  signIn(user: User): SignInResponse {
    const { password, ...payload } = user;
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: "7d" }),
    };
  }

  async signUp(body: SignUpBody): Promise<void> {
    await this.userService.createOne(body);
  }
}
