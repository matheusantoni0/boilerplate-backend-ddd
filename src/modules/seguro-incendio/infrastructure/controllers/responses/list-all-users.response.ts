import { instanceToPlain } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

import { User } from "#/modules/seguro-incendio/domain/entities";

export class ListAllUsersResponse {
  @IsNumber()
  public id!: number;

  @IsString()
  public email!: string;

  @IsString()
  public username!: string;

  public constructor(props: User) {
    this.id = props.id.unwrap();
    this.email = props.email;
    this.username = props.username;
  }

  public toPlain(): unknown {
    return instanceToPlain(this);
  }
}
