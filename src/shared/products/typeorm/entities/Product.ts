import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    deletedAt: Date;
}