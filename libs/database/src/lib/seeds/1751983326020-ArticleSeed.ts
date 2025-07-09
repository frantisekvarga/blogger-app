import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Article } from 'database';

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
