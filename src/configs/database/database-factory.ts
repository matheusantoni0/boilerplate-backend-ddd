import { DataSource } from "typeorm";
import { None, Option } from "oxide.ts";

import { ormConfig } from "#/configs/database/ormconfig";

export class DatabaseFactory {
  public static database: Option<DataSource> = None;

  public static async create(): Promise<DataSource> {
    if (DatabaseFactory.database.isNone()) {
      const dataSource = new DataSource(ormConfig);
      DatabaseFactory.database = Option(dataSource);
    }

    return DatabaseFactory.database.unwrap();
  }
}

export const dataSource = DatabaseFactory.create();
