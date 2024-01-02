import { injectable, inject } from "inversify";
import { Response } from "express";
import { JsonController, Res, Body, Post } from "routing-controllers";
import { StatusCodes } from "http-status-codes";
import { None } from "oxide.ts";

import { CreateUserUseCaseSymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { CreateUserUseCase } from "#/modules/seguro-incendio/domain/usecases";
import { User } from "#/modules/seguro-incendio/domain/entities";
import { CreateUserRequest } from "#/modules/seguro-incendio/infrastructure/controllers/requests/create-user.request";

@injectable()
@JsonController()
export class CreateUserController {
  public constructor(
    @inject(CreateUserUseCaseSymbol) private readonly usecase: CreateUserUseCase,
  ) {}

  @Post("/user/create")
  public async handler(@Res() res: Response, @Body() req: CreateUserRequest): Promise<Response> {
    const user = new User(None, req.username, req.email);

    await this.usecase.execute(user);

    return this.onSuccess(res);
  }

  private async onSuccess(res: Response): Promise<Response> {
    return res.status(StatusCodes.OK).send();
  }
}
