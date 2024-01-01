import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import { RoutingControllersOptions, useContainer, useExpressServer } from "routing-controllers";
import { serve, setup } from "swagger-ui-express";

import { BodyParserMiddleware } from "#/configs/server/body-parser-middleware";
import { CorsMiddleware } from "#/configs/server/cors-middleware";
import { diContainer } from "#/di-container";
import { Swagger } from "#/configs/server/swagger";
import { DefaultErrorHandlerMiddleware } from "#/configs/server/default-error-handler-middleware";

const server = express();

const routingOptions: RoutingControllersOptions = {
  validation: true,
  classTransformer: true,
  plainToClassTransformOptions: {
    enableImplicitConversion: false,
  },
  defaultErrorHandler: false,
};

server.disable("x-powered-by");

server.set("trust proxy", ["uniquelocal", "loopback"]);

server.use("/docs", serve, setup(Swagger.setup(routingOptions)));

server.use(helmet());
server.use(CorsMiddleware.create());
server.use(cookieParser());
server.use(BodyParserMiddleware.create());

useContainer(diContainer);
useExpressServer(server, routingOptions);

server.get("/", (req, res) => res.status(StatusCodes.OK).send("Hello Aluger!"));

server.use(DefaultErrorHandlerMiddleware.create());

export { server };
