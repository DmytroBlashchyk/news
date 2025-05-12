import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Repository, FindOneOptions, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class BaseRepository<T> {
  protected repository: Repository<T>;

  constructor(
    @Inject(forwardRef(() => Repository))
    repository: Repository<T>,
  ) {
    this.repository = repository;
  }

  async save(entity: any): Promise<T> {
    return this.repository.save(entity);
  }

  create(entity: T): T {
    return this.repository.create(entity);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | undefined> {
    return this.repository.findOne(options);
  }

  async remove(entity: T): Promise<T> {
    return this.repository.remove(entity);
  }

  protected createQueryBuilder(entity: string): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(entity);
  }

  async find(options: FindOneOptions<T> = {}): Promise<T[]> {
    return this.repository.find(options);
  }
}
