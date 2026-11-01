import {
  Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { CustomerAddress } from './customer-address.entity';
import { Order } from './order.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  // customers (1) -> (N) customer_addresses
  @OneToMany(() => CustomerAddress, (address) => address.customer)
  addresses: CustomerAddress[];

  // customers (1) -> (N) orders
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
