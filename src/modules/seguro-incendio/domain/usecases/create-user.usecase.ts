import { Ok, Result } from "oxide.ts";
import { inject, injectable } from "inversify";

import { ApplicationError } from "#/modules/common/infrastructure/application-error-response";
import { UserRepositorySymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { User } from "#/modules/seguro-incendio/domain/entities";
import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";

@injectable()
export class CreateUserUseCase {
  public constructor(
    @inject(UserRepositorySymbol) private readonly termoRepository: UserRepository,
  ) {}

  public async execute(user: User): Promise<Result<unknown, ApplicationError>> {
    await this.termoRepository.upsert(user);
    return Ok(undefined);
  }
}
