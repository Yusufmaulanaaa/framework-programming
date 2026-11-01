import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Book } from './book.entity';
import { Author } from './author.entity';

// Tabel penghubung many-to-many; primary key gabungan (book_id, author_id)
@Entity({ name: 'book_authors' })
export class BookAuthor {
  @PrimaryColumn({ name: 'book_id', type: 'varchar', length: 36 })
  bookId: string;

  @PrimaryColumn({ name: 'author_id', type: 'varchar', length: 36 })
  authorId: string;

  @ManyToOne(() => Book, (book) => book.bookAuthors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => Author, (author) => author.bookAuthors, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: Author;
}
