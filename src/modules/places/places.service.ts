import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';


@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place, 'store') // Specify database1
    private placeRepository: Repository<Place>,
    
    
  ) {}

  async findAll(): Promise<Place[]> {
    return this.placeRepository.find();
  }

  async findOne(id: string): Promise<Place> {
    return this.placeRepository.findOneBy({ id });
  }
 async getPlaces(
  page: number,
  pageSize: number,
  category: string
): Promise<{ data: Place[]; rowCount: number; currentPage: number; pageSize: number }> {
  let queryOptions = {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };

  if (category !== 'All') {
    queryOptions['where'] = { category };
  }

  const [Placeions, rowCount] = await this.placeRepository.findAndCount(queryOptions);

  // Convert image Buffers to Base64 for all Places
  

  return {
    data: Placeions,  // Array of data with images in Base64
    rowCount,             // Total number of items
    currentPage: page,    // Current page number
    pageSize,             // Page size
  };
}

  async create(Place: Place): Promise<Place> {

    return this.placeRepository.save(Place);
  }

  async update(id: string, Place: Partial<Place>): Promise<Place> {
    await this.placeRepository.update(id, Place);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.placeRepository.delete(id);
  }
}