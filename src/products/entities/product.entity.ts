import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from './';
import { User } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '18df649a-2e68-4743-96c9-20deb7c2e761',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product tittle',
        uniqueItems: true
    })
    @Column('text', { unique: true })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price',
    })
    @Column('float', { default: 0 })
    price: number; 

    @ApiProperty({
        example: 'lorem ipsum',
        description: 'Product ID',
        uniqueItems: true
    })
    @Column({
        type: 'text', // Different way to declare column type
        nullable: true
    })
    description: string;

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product slug - for SEO',
        uniqueItems: true
    })
    @Column('text', { unique: true })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', { default: 0 })
    stock: number;

    @ApiProperty({
        example: ['M','L','XL'],
        description: 'Product sizes', 
    })
    @Column('text', { array: true })
    sizes: string[]

    @ApiProperty({
        example: 'women',
        description: 'Product gender', 
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty()
    @OneToMany( () => ProductImage, (productImage) => productImage.product, 
    { cascade: true, eager: true })
    images?: ProductImage[];

    @ManyToOne( () => User, ( user ) => user.product, { eager: true } )
    user: User

    @BeforeInsert()
    checkSlugInsert() { 

        if (!this.slug) {
            this.slug = this.title
        }
        
        this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
        .toLocaleLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '')
    }

}
