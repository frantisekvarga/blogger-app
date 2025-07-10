import { Article } from 'database';
import type { DataSource } from 'typeorm';
import type { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class ArticleSeed1751983326020 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const articleFactory = await factoryManager.get(Article);
    await articleFactory.saveMany(10);
  }
}
