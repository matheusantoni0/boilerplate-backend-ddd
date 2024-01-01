import { DataSourceOptions } from "typeorm";

import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  isProdOrStaging,
} from "#/configs/env/settings";

export const ormConfig: DataSourceOptions = {
  type: "postgres",
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  synchronize: !isProdOrStaging(),
  entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
  migrations: ["./src/configs/database/migrations/*.ts"],
};
