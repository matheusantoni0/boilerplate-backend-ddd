import { TypeOrmHelper } from "#/configs/database/typerorm.helper";
import { diContainer } from "#/di-container";
import {
  UserRepositorySymbol,
  CreateUserUseCaseSymbol,
  TypeOrmHelperSymbol,
  ListAllUsersUseCaseSymbol,
} from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";
import { CreateUserUseCase, ListAllUsersUseCase } from "#/modules/seguro-incendio/domain/usecases";
import { ListAllUsersController } from "#/modules/seguro-incendio/infrastructure/controllers";
import { TypeOrmUserRepository } from "#/modules/seguro-incendio/infrastructure/repositories";

diContainer.bind<UserRepository>(UserRepositorySymbol).to(TypeOrmUserRepository);

diContainer.bind<ListAllUsersController>(ListAllUsersController).toSelf();
diContainer.bind<CreateUserUseCase>(CreateUserUseCaseSymbol).to(CreateUserUseCase);
diContainer.bind<ListAllUsersUseCase>(ListAllUsersUseCaseSymbol).to(ListAllUsersUseCase);

diContainer.bind<TypeOrmHelper>(TypeOrmHelperSymbol).to(TypeOrmHelper);
