import { injectable, inject } from "inversify";
import { Response } from "express";
import { JsonController, Get, Res } from "routing-controllers";
import { StatusCodes } from "http-status-codes";
import { ResponseSchema } from "routing-controllers-openapi";

import { ListAllUsersUseCaseSymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { ListAllUsersUseCase } from "#/modules/seguro-incendio/domain/usecases";
import { ListAllUsersResponse } from "#/modules/seguro-incendio/infrastructure/controllers/responses/list-all-users.response";

@injectable()
@JsonController()
export class ListAllUsersController {
  public constructor(
    @inject(ListAllUsersUseCaseSymbol) private readonly usecase: ListAllUsersUseCase,
  ) {}

  @ResponseSchema(ListAllUsersResponse)
  @Get("/user/list-all")
  public async handler(@Res() res: Response): Promise<Response> {
    const response = await this.usecase.execute();
    const users = response.unwrap();
    return res
      .status(StatusCodes.OK)
      .send(users.map((user) => new ListAllUsersResponse(user).toPlain()));
  }
}
