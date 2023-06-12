import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,

    @InjectRepository( User )
    private readonly userRepository: Repository<User>
  ){}

  async runSeed() {

    await this.deleteTables();
    const adminUser = await this.insertUsers()

    await this.inserNewProducts( adminUser );
    return 'Seed executed!';
    
  }

  private async deleteTables() {

    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async insertUsers() {

    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach( user => {
      users.push( this.userRepository.create( user ) )
    });

    const dbUsers = await this.userRepository.save( seedUsers ) 

    return dbUsers[0];

  }
  
  private async inserNewProducts( user: User ) {
    
    await this.productsService.deleteAllProducts()
    const products = initialData.products
    const inserPromises = []
  
    products.forEach( product => {
      inserPromises.push( this.productsService.create( product, user ) )
    });
  
    await Promise.all( inserPromises )
  
    return true;
  }

}