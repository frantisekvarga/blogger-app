import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50, default: 'user' })
  role: string;

  @OneToMany(() => Article, article => article.author)
  articles: Article[];
}
