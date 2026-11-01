import {
  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { decimalTransformer } from '../common/decimal.transformer';
import { Order } from './order.entity';
import { Book } from './book.entity';

@Entity({ name: 'order_items' })
@Unique(['orderId', 'bookId']) // satu buku hanya satu baris per pesanan
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id', type: 'varchar', length: 36 })
  orderId: string;

  @Column({ name: 'book_id', type: 'varchar', length: 36 })
  bookId: string;

  @Column({ type: 'int' })
  quantity: number;

  // Snapshot harga satuan saat transaksi (bukan duplikasi books.price)
  @Column({
    type: 'decimal', precision: 12, scale: 2,
    transformer: decimalTransformer,
  })
  price: number;

  // subtotal = quantity * price
  @Column({
    type: 'decimal', precision: 12, scale: 2,
    transformer: decimalTransformer,
  })
  subtotal: number;

  // orders (1) -> (N) order_items
  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  // books (1) -> (N) order_items
  @ManyToOne(() => Book, (book) => book.orderItems, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
