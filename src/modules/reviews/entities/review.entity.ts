import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { User } from "../../users/entities/user.entity";

@Entity('reviews')
// @Unique(['userId', 'productId'])
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Product;

  @ManyToOne(() => User)
  user: User;

  @Column()
  rating: number;

  @Column('text')
  comment: string;
}