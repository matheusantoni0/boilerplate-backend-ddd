import { Ok, Err, Result } from "oxide.ts";
import { inject, injectable } from "inversify";

import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";
import { UserRepositorySymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { User } from "#/modules/seguro-incendio/domain/entities";
import { ApplicationError } from "#/modules/common/infrastructure/application-error-response";

@injectable()
export class GetUserByIdUseCase {
  public constructor(
    @inject(UserRepositorySymbol) private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: number): Promise<Result<User, ApplicationError>> {
    const user = await this.userRepository.getById(id);

    if (user.isErr()) {
      return Err(user.unwrapErr());
    }
    return Ok(user.unwrap());
  }
}
