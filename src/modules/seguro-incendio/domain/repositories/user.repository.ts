import { Result } from "oxide.ts";

import { User } from "#/modules/seguro-incendio/domain/entities";
import { ApplicationError } from "#/modules/common/infrastructure/application-error-response";

export abstract class UserRepository {
  public abstract upsert(entity: User): Promise<Result<void, void>>;

  public abstract listAll(): Promise<Result<User[], void>>;

  public abstract getById(id: number): Promise<Result<User, ApplicationError>>;

  public abstract deleteById(id: number): Promise<Result<void, ApplicationError>>;
}
