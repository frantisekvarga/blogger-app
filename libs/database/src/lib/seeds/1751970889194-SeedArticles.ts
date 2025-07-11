import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Article } from '../entities/article.entity';

export class SeedArticles1751970889194 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const articleFactory = await factoryManager.get(Article);

    
    await articleFactory.saveMany(30);
  }
}
