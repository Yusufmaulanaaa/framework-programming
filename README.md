# Modern BookStore E-Commerce Platform

A comprehensive e-commerce application for book sales using NestJS, TypeORM, and MySQL.

## Project Overview

This project implements a complete book e-commerce solution with the following key features:

- **User Management**: Customer accounts with addresses and profiles
- **Product Catalog**: Books categorized by genres, authors, and publishers
- **Shopping Cart**: Order management and payment processing
- **Order System**: Complete workflow from cart to delivery
- **Payment Integration**: Secure payment processing
- **Inventory Management**: Book stock tracking and ordering

## Core Features

### Database Schema
- customers (user accounts)
- customer_addresses (shipping/billing addresses)
- categories (book categories/genres)
- publishers (book publishers)
- authors (book authors)
- books (product catalog)
- book_authors (many-to-many relationship)
- orders (customer orders)
- order_items (order line items)
- payments (payment records)
- shipments (delivery tracking)

### Technical Architecture
- **Framework**: NestJS (TypeScript-based)
- **Database**: MySQL with TypeORM ORM
- **Security**: Global configuration management
- **Development**: Hot reload for faster iteration

## Quick Start

### Prerequisites
- Node.js (v18+)
- MySQL database

### Installation
```bash
npm install
```

### Database Setup
1. Create MySQL database named `bookstore`
2. Configure environment variables in `.env` file
3. Environment template available in `.env.example`

### Running the Application
```bash
npm run start:dev
```

## Project Structure

```
src/
├── common/              # Common utilities and helpers
│   └── decimal.transformer.ts
├── entities/            # TypeORM entities (11 total)
│   ├── author.entity.ts
│   ├── book.entity.ts
│   ├── category.entity.ts
│   ├── customer.entity.ts
│   ├── ... (other entities)
│   └── index.ts
├── app.module.ts        # Main NestJS module
└── main.ts             # Application entry point
docs/
├── ERD.md              # Entity relationship diagram documentation
└── ERD_BookStore.png   # Visual ERD diagram
```

## Key Differences from Original

- **Unique Identity**: Project developed by Yusufmaulanaaa
- **Custom Configuration**: Environment-specific settings
- **Modern Documentation**: Updated README structure
- **Clean Repository**: No references to external contributors
- **Personalized Features**: Tailored requirements and functionality

## Technologies Used

- **Backend**: NestJS 11
- **Database**: TypeORM with MySQL
- **Environment**: Node.js with npm
- **Configuration**: `@nestjs/config` package

## Development Setup

This project is designed for educational purposes and personal development, featuring:

- Clean, maintainable code structure
- Comprehensive documentation
- Flexible configuration options
- Scalable architecture for future enhancements

## Contact

For questions or collaboration opportunities:
- GitHub: https://github.com/Yusufmaulanaaa/framework-programming
- Email: yusufmaulanasyifa25@gmail.com