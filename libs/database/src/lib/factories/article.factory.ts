import { setSeederFactory } from 'typeorm-extension';
import { Article } from 'database';
import { faker } from '@faker-js/faker';

export default setSeederFactory(Article, () => {
    const article = new Article();

  article.title = faker.lorem.sentence(6);
  article.image_url = faker.image.url(); 
  article.content = faker.lorem.paragraphs(3);
  article.user_id = faker.number.int({ min: 1, max: 5 }); 
  article.published_at = faker.date.recent({ days: 30 }); 
  article.perex = faker.lorem.sentences(2); 
  article.image_url = faker.image.url();
  article.content = faker.lorem.paragraphs(5); 
  article.isPublished = faker.datatype.boolean(); 
  article.user_id = faker.number.int({ min: 1, max: 5 });
  article.published_at = faker.date.recent({ days: 30 });
  article.createdAt = faker.date.past();
  article.updatedAt = faker.date.recent();

  return article;
});
