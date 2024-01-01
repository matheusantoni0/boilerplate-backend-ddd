import { User } from "#/modules/seguro-incendio/domain/entities";

export abstract class UserRepository {
  public abstract upsert(entity: User): Promise<void>;

  public abstract listAll(): Promise<User[]>;
}
