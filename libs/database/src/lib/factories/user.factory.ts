import { User } from 'database';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, faker => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  return user;
});
