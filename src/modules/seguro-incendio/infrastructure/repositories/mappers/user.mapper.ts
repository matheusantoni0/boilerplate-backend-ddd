import { Option } from "oxide.ts";

import { User } from "#/modules/seguro-incendio/domain/entities";
import { UserEntity } from "#/modules/seguro-incendio/infrastructure/repositories/entities/user.entity";
import { Mapper } from "#/modules/common/infrastructure/mapper";

export class UserMapper implements Mapper<UserEntity, User> {
  public toDomain(userEntity: UserEntity): User {
    return new User(Option<number>(userEntity.id), userEntity.email, userEntity.username);
  }

  public toPersist(user: User): UserEntity {
    const userEntity = new UserEntity();

    userEntity.email = user.email;
    userEntity.username = user.username;

    return userEntity;
  }
}
