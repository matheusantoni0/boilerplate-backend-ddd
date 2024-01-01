import { Option } from "oxide.ts";

interface UserPrimitive {
  id?: number;
  email: string;
  username: string;
}

export class User {
  public constructor(public id: Option<number>, public email: string, public username: string) {}

  public toJson(): UserPrimitive {
    return {
      id: this.id.unwrap(),
      email: this.email,
      username: this.username,
    };
  }
}
