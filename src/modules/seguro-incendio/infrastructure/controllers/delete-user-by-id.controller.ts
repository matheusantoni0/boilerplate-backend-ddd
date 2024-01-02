import { injectable, inject } from "inversify";
import { Response } from "express";
import { JsonController, Delete, Res, Params } from "routing-controllers";
import { StatusCodes } from "http-status-codes";

import { DeleteUserByIdUseCaseSymbol } from "#/modules/seguro-incendio/application/dependency-injection/user.di-tokens";
import { DeleteUserByIdUseCase } from "#/modules/seguro-incendio/domain/usecases";
import { DeleteUserByIdRequest } from "#/modules/seguro-incendio/infrastructure/controllers/requests/delete-user-by-id.request";

@injectable()
@JsonController()
export class DeleteUserByIdController {
  public constructor(
    @inject(DeleteUserByIdUseCaseSymbol) private readonly usecase: DeleteUserByIdUseCase,
  ) {}

  @Delete("/user/:id")
  public async handler(
    @Res() res: Response,
    @Params() request: DeleteUserByIdRequest,
  ): Promise<Response> {
    await this.usecase.execute(request.id);

    return this.onSuccess(res);
  }

  private async onSuccess(res: Response): Promise<Response> {
    return res.status(StatusCodes.OK).send();
  }
}
