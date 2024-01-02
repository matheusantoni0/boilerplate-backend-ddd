import { injectable, inject } from "inversify";
import { Response } from "express";
import { JsonController, Get, Res, Params } from "routing-controllers";
import { StatusCodes } from "http-status-codes";
import { ResponseSchema } from "routing-controllers-openapi";

import { User } from "#/modules/seguro-incendio/domain/entities";
import { GetUserByIdUseCase } from "#/modules/seguro-incendio/domain/usecases";
import { GetUserByIdUseCaseSymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { GetUserByIdRequest } from "#/modules/seguro-incendio/infrastructure/controllers/requests/get-user-by-id.request";
import {
  ApplicationError,
  ApplicationErrorResponse,
} from "#/modules/common/infrastructure/application-error-response";
import { GetUserByIdResponse } from "#/modules/seguro-incendio/infrastructure/controllers/responses";

@injectable()
@JsonController()
export class GetUserByIdController {
  public constructor(
    @inject(GetUserByIdUseCaseSymbol) private readonly usecase: GetUserByIdUseCase,
  ) {}

  @ResponseSchema(GetUserByIdResponse)
  @Get("/user/:id")
  public async handler(
    @Res() res: Response,
    @Params() request: GetUserByIdRequest,
  ): Promise<Response> {
    const response = await this.usecase.execute(request.id);

    if (response.isErr()) return this.onUserNotFound(response.unwrapErr(), res);

    const users = response.unwrap();

    return this.onSuccess(users, res);
  }

  private async onSuccess(user: User, res: Response): Promise<Response> {
    return res.status(StatusCodes.OK).send(new GetUserByIdResponse(user).toPlain());
  }

  private async onUserNotFound(error: ApplicationError, res: Response): Promise<Response> {
    return res.status(StatusCodes.NOT_FOUND).send(new ApplicationErrorResponse(error).toPlain());
  }
}
