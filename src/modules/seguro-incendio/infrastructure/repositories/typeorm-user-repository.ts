import { inject, injectable } from "inversify";

import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";
import { TypeOrmHelper } from "#/configs/database/typerorm.helper";
import { UserEntity } from "#/modules/seguro-incendio/infrastructure/repositories/entities/user.entity";
import { User } from "#/modules/seguro-incendio/domain/entities";
import { UserMapper } from "#/modules/seguro-incendio/infrastructure/repositories/mappers";
import { TypeOrmHelperSymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";

@injectable()
export class TypeOrmUserRepository implements UserRepository {
  public constructor(@inject(TypeOrmHelperSymbol) private readonly typeOrmHelper: TypeOrmHelper) {}

  public async upsert(user: User): Promise<void> {
    const connection = await this.typeOrmHelper.openTransaction();

    const existingUser = await connection
      .getRepository(UserEntity)
      .findOne({ where: { email: user.email } });

    if (existingUser) {
      await connection
        .getRepository(UserEntity)
        .save({ email: user.email, username: user.username });
    } else {
      const newUser = new UserMapper().toPersist(user);
      await connection.getRepository(UserEntity).save(newUser);
    }

    await this.typeOrmHelper.closeTransaction();
  }

  public async listAll(): Promise<User[]> {
    const connection = await this.typeOrmHelper.openTransaction();

    const users = await connection.getRepository(UserEntity).find();
    const usersToDomain: User[] = users.map((user) => new UserMapper().toDomain(user));

    await this.typeOrmHelper.closeTransaction();

    return usersToDomain;
  }
}
