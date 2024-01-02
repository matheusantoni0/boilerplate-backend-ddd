import { IsNumber } from "class-validator";

export class DeleteUserByIdRequest {
  @IsNumber()
  public id!: number;
}
