import * as bcrypt from 'bcryptjs';
import { User } from 'database';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async faker => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email();

  // Hash password pre kompatibilitu s AuthService
  const plainPassword = faker.internet.password();
  const saltRounds = 10;
  user.password = await bcrypt.hash(plainPassword, saltRounds);

  user.role = faker.helpers.arrayElement(['user', 'admin']);
  return user;
});
