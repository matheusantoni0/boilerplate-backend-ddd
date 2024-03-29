import { Ok, Result } from "oxide.ts";
import { inject, injectable } from "inversify";

import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";
import { UserRepositorySymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { User } from "#/modules/seguro-incendio/domain/entities";

@injectable()
export class ListAllUsersUseCase {
  public constructor(
    @inject(UserRepositorySymbol) private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<Result<User[], void>> {
    const users = await this.userRepository.listAll();
    return Ok(users.unwrap());
  }
}
