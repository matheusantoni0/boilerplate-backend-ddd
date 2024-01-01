import { Ok, Result } from "oxide.ts";
import { inject, injectable } from "inversify";

import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";
import { ApplicationError } from "#/modules/common/infrastructure/application-error-response";
import { UserRepositorySymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { User } from "#/modules/seguro-incendio/domain/entities";

@injectable()
export class ListAllUsersUseCase {
  public constructor(
    @inject(UserRepositorySymbol) private readonly termoRepository: UserRepository,
  ) {}

  public async execute(): Promise<Result<User[], ApplicationError>> {
    const users = await this.termoRepository.listAll();
    return Ok(users);
  }
}
