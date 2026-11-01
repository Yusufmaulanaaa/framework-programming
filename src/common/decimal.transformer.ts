import { ValueTransformer } from 'typeorm';

// TypeORM mengembalikan DECIMAL sebagai string; transformer ini mengubahnya ke number.
export const decimalTransformer: ValueTransformer = {
  to: (value?: number) => value,
  from: (value?: string | null) => (value == null ? value : parseFloat(value)),
};
