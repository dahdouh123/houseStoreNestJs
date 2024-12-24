import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, 'store') // Specify database1
    private productRepository: Repository<Product>,
    
    
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }
 async getProductions(
  page: number,
  pageSize: number,
  category: string
): Promise<{ data: Product[]; rowCount: number; currentPage: number; pageSize: number }> {
  let queryOptions = {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };

  if (category !== 'All') {
    queryOptions['where'] = { category };
  }

  const [productions, rowCount] = await this.productRepository.findAndCount(queryOptions);

  // Convert image Buffers to Base64 for all products
  

  return {
    data: productions,  // Array of data with images in Base64
    rowCount,             // Total number of items
    currentPage: page,    // Current page number
    pageSize,             // Page size
  };
}

  async create(product: Product): Promise<Product> {

    return this.productRepository.save(product);
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}