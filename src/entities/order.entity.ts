import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany,
  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { decimalTransformer } from '../common/decimal.transformer';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';
import { Shipment } from './shipment.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'customer_id', type: 'varchar', length: 36 })
  customerId: string;

  @Column({ name: 'order_number', type: 'varchar', length: 50, unique: true })
  orderNumber: string;

  @Column({ type: 'varchar', length: 30, default: OrderStatus.PENDING })
  status: OrderStatus;

  // --- Snapshot alamat pengiriman saat checkout ---
  // Perubahan di customer_addresses tidak mengubah riwayat pesanan lama.
  @Column({ name: 'shipping_recipient_name', type: 'varchar', length: 150 })
  shippingRecipientName: string;

  @Column({ name: 'shipping_phone', type: 'varchar', length: 20 })
  shippingPhone: string;

  @Column({ name: 'shipping_address', type: 'text' })
  shippingAddress: string;

  @Column({ name: 'shipping_city', type: 'varchar', length: 100 })
  shippingCity: string;

  @Column({ name: 'shipping_postal_code', type: 'varchar', length: 10 })
  shippingPostalCode: string;

  // Biaya kirim (komponen biaya selain subtotal item)
  @Column({
    name: 'shipping_cost', type: 'decimal', precision: 12, scale: 2, default: 0,
    transformer: decimalTransformer,
  })
  shippingCost: number;

  // Snapshot: total_amount = SUM(order_items.subtotal) + shipping_cost
  // Dihitung & dijaga konsistensinya di service (dalam satu transaksi DB).
  @Column({
    name: 'total_amount', type: 'decimal', precision: 12, scale: 2, default: 0,
    transformer: decimalTransformer,
  })
  totalAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // customers (1) -> (N) orders
  @ManyToOne(() => Customer, (customer) => customer.orders, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // orders (1) -> (N) order_items
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: ['insert'] })
  items: OrderItem[];

  // orders (1) -> (1) payments
  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  // orders (1) -> (1) shipments
  @OneToOne(() => Shipment, (shipment) => shipment.order)
  shipment: Shipment;
}
