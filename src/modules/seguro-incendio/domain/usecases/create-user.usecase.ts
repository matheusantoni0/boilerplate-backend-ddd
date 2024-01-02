import { Ok, Result } from "oxide.ts";
import { inject, injectable } from "inversify";

import { ApplicationError } from "#/modules/common/infrastructure/application-error-response";
import { UserRepositorySymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { User } from "#/modules/seguro-incendio/domain/entities";
import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";

@injectable()
export class CreateUserUseCase {
  public constructor(
    @inject(UserRepositorySymbol) private readonly userRepository: UserRepository,
  ) {}

  public async execute(user: User): Promise<Result<undefined, ApplicationError>> {
    await this.userRepository.upsert(user);
    return Ok(undefined);
  }
}
