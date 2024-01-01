import { IsString } from "class-validator";

export class CreateUserRequest {
  @IsString()
  public email!: string;

  @IsString()
  public username!: string;
}
