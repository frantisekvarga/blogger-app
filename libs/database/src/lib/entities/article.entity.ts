import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', name: 'image_url' })
  image_url: string;

  @Column({ type: 'int', name: 'user_id' })
  user_id: number;

  @Column({
    type: 'timestamp',
    name: 'published_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  published_at: Date;

  @ManyToOne(() => User, user => user.articles)
  @JoinColumn({ name: 'user_id' })
  author: User;
}
