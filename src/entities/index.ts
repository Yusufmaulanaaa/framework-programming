import { Customer } from './customer.entity';
import { CustomerAddress } from './customer-address.entity';
import { Category } from './category.entity';
import { Publisher } from './publisher.entity';
import { Author } from './author.entity';
import { Book } from './book.entity';
import { BookAuthor } from './book-author.entity';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';
import { Shipment } from './shipment.entity';

export const entities = [
  Customer, CustomerAddress, Category, Publisher, Author,
  Book, BookAuthor, Order, OrderItem, Payment, Shipment,
];

export * from './customer.entity';
export * from './customer-address.entity';
export * from './category.entity';
export * from './publisher.entity';
export * from './author.entity';
export * from './book.entity';
export * from './book-author.entity';
export * from './order.entity';
export * from './order-item.entity';
export * from './payment.entity';
export * from './shipment.entity';
