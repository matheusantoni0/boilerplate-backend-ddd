/* eslint-disable */
require("reflect-metadata");
require("module-alias").addAlias("#", __dirname);

require("#/configs/env/load-envs");
require("#/configs/server/load-modules").loadModules();

import { diContainer } from "#/di-container";
import { APP_PORT, POSTGRES_PORT } from "#/configs/env/settings";
import { server } from "#/configs/server";
import { DatabaseFactory } from "#/configs/database/database-factory";
import { Container } from "#/configs/container";

Container.useStorage(diContainer);

Promise.all([DatabaseFactory.create()]).then(() => {
  console.info(`✔️  Postgres connect in port ${POSTGRES_PORT}`);
});

server.listen(APP_PORT, () => {
  console.info(`✔️  Server running on port ${APP_PORT}`);
});
/* eslint-enable */
