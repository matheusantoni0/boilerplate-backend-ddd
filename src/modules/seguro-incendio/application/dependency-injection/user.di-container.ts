import { TypeOrmHelper } from "#/configs/database/typeorm.helper";
import { diContainer } from "#/configs/container/di-container";
import {
  UserRepositorySymbol,
  CreateUserUseCaseSymbol,
  TypeOrmHelperSymbol,
  ListAllUsersUseCaseSymbol,
  GetUserByIdUseCaseSymbol,
  DeleteUserByIdUseCaseSymbol,
} from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { UserRepository } from "#/modules/seguro-incendio/domain/repositories";
import {
  CreateUserUseCase,
  GetUserByIdUseCase,
  ListAllUsersUseCase,
  DeleteUserByIdUseCase,
} from "#/modules/seguro-incendio/domain/usecases";
import {
  CreateUserController,
  GetUserByIdController,
  ListAllUsersController,
} from "#/modules/seguro-incendio/infrastructure/controllers";
import { TypeOrmUserRepository } from "#/modules/seguro-incendio/infrastructure/repositories";
import { DeleteUserByIdController } from "#/modules/seguro-incendio/infrastructure/controllers/delete-user-by-id.controller";

diContainer.bind<UserRepository>(UserRepositorySymbol).to(TypeOrmUserRepository);

diContainer.bind<ListAllUsersController>(ListAllUsersController).toSelf();
diContainer.bind<CreateUserController>(CreateUserController).toSelf();
diContainer.bind<GetUserByIdController>(GetUserByIdController).toSelf();
diContainer.bind<DeleteUserByIdController>(DeleteUserByIdController).toSelf();

diContainer.bind<GetUserByIdUseCase>(GetUserByIdUseCaseSymbol).to(GetUserByIdUseCase);
diContainer.bind<DeleteUserByIdUseCase>(DeleteUserByIdUseCaseSymbol).to(DeleteUserByIdUseCase);
diContainer.bind<CreateUserUseCase>(CreateUserUseCaseSymbol).to(CreateUserUseCase);
diContainer.bind<ListAllUsersUseCase>(ListAllUsersUseCaseSymbol).to(ListAllUsersUseCase);

diContainer.bind<TypeOrmHelper>(TypeOrmHelperSymbol).to(TypeOrmHelper);
