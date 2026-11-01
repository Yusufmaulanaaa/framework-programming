import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn,
  ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { decimalTransformer } from '../common/decimal.transformer';
import { Category } from './category.entity';
import { Publisher } from './publisher.entity';
import { BookAuthor } from './book-author.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Diperbesar dari 30 -> 255 agar judul buku yang panjang tetap muat
  @Column({ type: 'varchar', length: 255 })
  title: string;

  // Kolom `author` DIHAPUS: nama penulis dikelola lewat authors + book_authors
  // supaya tidak redundan / tidak inkonsisten (normalisasi).

  @Column({ type: 'varchar', length: 45, unique: true })
  isbn: string;

  @Column({ type: 'int', default: 0 })
  publishedYear: number;

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({
    type: 'decimal', precision: 12, scale: 2, default: 0,
    transformer: decimalTransformer,
  })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ name: 'category_id', type: 'varchar', length: 36 })
  categoryId: string;

  @Column({ name: 'publisher_id', type: 'varchar', length: 36 })
  publisherId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  // categories (1) -> (N) books
  @ManyToOne(() => Category, (category) => category.books, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // publishers (1) -> (N) books
  @ManyToOne(() => Publisher, (publisher) => publisher.books, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  // books (1) -> (N) book_authors  (books N <-> N authors)
  @OneToMany(() => BookAuthor, (ba) => ba.book)
  bookAuthors: BookAuthor[];

  // books (1) -> (N) order_items
  @OneToMany(() => OrderItem, (item) => item.book)
  orderItems: OrderItem[];
}
