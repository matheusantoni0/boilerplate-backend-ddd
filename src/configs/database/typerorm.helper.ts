import { DataSource } from "typeorm";
import { injectable } from "inversify";

import { DatabaseFactory } from "#/configs/database/database-factory";

@injectable()
export class TypeOrmHelper {
  public async openTransaction(): Promise<DataSource> {
    const dataSource = await DatabaseFactory.database.unwrap().initialize();

    return dataSource;
  }

  public async closeTransaction(): Promise<void> {
    await DatabaseFactory.database.unwrap().destroy();
  }
}
