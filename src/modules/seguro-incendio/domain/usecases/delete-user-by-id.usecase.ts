import { Ok, Err, Result } from "oxide.ts";
import { inject, injectable } from "inversify";

import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";
import { UserRepositorySymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { ApplicationError } from "#/modules/common/infrastructure/application-error-response";

@injectable()
export class DeleteUserByIdUseCase {
  public constructor(
    @inject(UserRepositorySymbol) private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: number): Promise<Result<void, ApplicationError>> {
    const user = await this.userRepository.deleteById(id);

    if (user.isErr()) return Err(user.unwrapErr());

    return Ok(undefined);
  }
}
