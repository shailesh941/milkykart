import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  discription?: string;

  @Column({ unique: true, nullable: true })
  slug?: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}