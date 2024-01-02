import { inject, injectable } from "inversify";
import { Err, None, Ok, Option, Result } from "oxide.ts";

import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";
import { TypeOrmHelper } from "#/configs/database/typeorm.helper";
import { UserEntity } from "#/modules/seguro-incendio/infrastructure/repositories/entities/user.entity";
import { User } from "#/modules/seguro-incendio/domain/entities";
import { UserMapper } from "#/modules/seguro-incendio/application/mappers";
import { TypeOrmHelperSymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { ApplicationError } from "#/modules/common/infrastructure/application-error-response";
import { userError } from "#/modules/seguro-incendio/application/errors/user.error";

@injectable()
export class TypeOrmUserRepository implements UserRepository {
  public constructor(@inject(TypeOrmHelperSymbol) private readonly typeOrmHelper: TypeOrmHelper) {}

  public async upsert(user: User): Promise<Result<void, void>> {
    const connection = await this.typeOrmHelper.openTransaction();

    const existingUser = Option(
      await connection.getRepository(UserEntity).findOne({ where: { email: user.email } }),
    );

    if (existingUser.isSome()) {
      await connection
        .getRepository(UserEntity)
        .save({ email: user.email, username: user.username });
    } else {
      const newUser = new UserMapper().toPersist(user);
      await connection.getRepository(UserEntity).save(newUser);
    }
    await this.typeOrmHelper.closeTransaction();
    return Ok(undefined);
  }

  public async listAll(): Promise<Result<User[], void>> {
    const connection = await this.typeOrmHelper.openTransaction();

    const users = await connection.getRepository(UserEntity).find();
    const usersToDomain: User[] = users.map((user) => new UserMapper().toDomain(user));

    await this.typeOrmHelper.closeTransaction();

    return Ok(usersToDomain);
  }

  public async getById(id: number): Promise<Result<User, ApplicationError>> {
    const connection = await this.typeOrmHelper.openTransaction();

    const user = Option(await connection.getRepository(UserEntity).findOne({ where: { id } }));

    await this.typeOrmHelper.closeTransaction();

    if (user.isNone()) return Err(userError.notFound);

    const userToDomain: User = new UserMapper().toDomain(user.unwrap());

    return Ok(userToDomain);
  }

  public async deleteById(id: number): Promise<Result<void, ApplicationError>> {
    const connection = await this.typeOrmHelper.openTransaction();

    const user = Option(await connection.getRepository(UserEntity).findOne({ where: { id } }));

    if (user.isNone()) return Err(userError.notFound);

    await connection.getRepository(UserEntity).delete({ id });

    await this.typeOrmHelper.closeTransaction();

    return Ok(undefined);
  }
}
