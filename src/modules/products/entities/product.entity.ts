import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; // Changed from 'name' to 'title' per your type

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discountPercentage: number;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  rating: number;

  @Column()
  stock: number;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  brand: string;

  @Column({ unique: true })
  sku: string;

  @Column('float', { nullable: true })
  weight: number;

  // Storing nested objects as JSON in MySQL
  @Column('json', { nullable: true })
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  @Column({ nullable: true })
  warrantyInformation: string;

  @Column({ nullable: true })
  shippingInformation: string;

  @Column({ nullable: true })
  availabilityStatus: string;

  @Column({ nullable: true })
  returnPolicy: string;

  @Column({ default: 1 })
  minimumOrderQuantity: number;

  @Column('json', { nullable: true })
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ nullable: true })
  thumbnail: string;

  // Relation to Category
  @ManyToOne(() => Category, (cat) => cat.products, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  // Relation to Reviews table
  @OneToMany(() => Review, (review) => review.product, { cascade: true })
  reviews: Review[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}