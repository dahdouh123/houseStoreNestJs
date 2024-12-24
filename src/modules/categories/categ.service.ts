import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/categorie.entity';


@Injectable()
export class CategService {
  constructor(
    @InjectRepository(Category, 'store') // Specify database1
    private categRepository: Repository<Category>,
    
    
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categRepository.findOneBy({ id });
  }
 async getCategorys(
  page: number,
  pageSize: number,
  category: string
): Promise<{ data: Category[]; rowCount: number; currentPage: number; pageSize: number }> {
  let queryOptions = {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };

  if (category !== 'All') {
    queryOptions['where'] = { category };
  }

  const [Categoryions, rowCount] = await this.categRepository.findAndCount(queryOptions);

  // Convert image Buffers to Base64 for all Categorys
  

  return {
    data: Categoryions,  // Array of data with images in Base64
    rowCount,             // Total number of items
    currentPage: page,    // Current page number
    pageSize,             // Page size
  };
}

  async create(Category: Category): Promise<Category> {

    return this.categRepository.save(Category);
  }

  async update(id: string, Category: Partial<Category>): Promise<Category> {
    await this.categRepository.update(id, Category);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.categRepository.delete(id);
  }
}