import { UserCreateBody } from "../user";

export class SignInBody {
  readonly username: string;

  readonly password: string;
}

export class SignInResponse {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export class SignUpBody extends UserCreateBody {}
