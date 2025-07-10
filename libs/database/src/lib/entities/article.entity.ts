import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image_url: string;

  @Column()
  content: string;

  @Column()
  user_id: number;

  @Column()
  published_at: Date;

  @Column()
  perex: string;

  @Column({ name: 'is_published' })
  isPublished: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}