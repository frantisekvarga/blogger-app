import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Article } from '../entities/article.entity';

export class SeedArticles1751970889194 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const articleRepository = dataSource.getRepository(Article);

    const articles = [
      {
        title: 'Lorem Ipsum Dolor Sit Amet',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image_url: 'https://picsum.photos/800/600',
        user_id: 1,
        published_at: new Date('2024-01-15'),
      },
      {
        title: 'Consectetur Adipiscing Elit',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image_url: 'https://picsum.photos/800/600',
        user_id: 2,
        published_at: new Date('2024-01-10'),
      },
      {
        title: 'Sed Do Eiusmod Tempor',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus. Curabitur aliquet quam id dui posuere blandit.',
        image_url: 'https://picsum.photos/800/600',
        user_id: 1,
        published_at: new Date('2024-01-20'),
      },
      {
        title: 'Incididunt Ut Labore',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Nulla quis lorem ut libero malesuada feugiat. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
        image_url: 'https://picsum.photos/800/600',
        user_id: 2,
        published_at: new Date('2024-01-25'),
      },
      {
        title: 'Dolore Magna Aliqua',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat.',
        image_url: 'https://picsum.photos/800/600',
        user_id: 1,
        published_at: new Date('2024-01-30'),
      },
    ];

    for (const articleData of articles) {
      const article = articleRepository.create(articleData);
      await articleRepository.save(article);
    }
  }
}
