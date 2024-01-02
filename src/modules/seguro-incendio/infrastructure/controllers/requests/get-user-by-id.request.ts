import { IsNumber } from "class-validator";

export class GetUserByIdRequest {
  @IsNumber()
  public id!: number;
}
