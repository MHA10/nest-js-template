import { NotFoundException } from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';

export abstract class BaseService<T extends { id: number | string }> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findOne(id: T['id'], options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne({
      ...(options || {}),
      where: { id } as unknown as FindOptionsWhere<T>,
    });

    if (!entity) {
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    return entity;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(id: T['id'], data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    this.repository.merge(entity, data);
    return await this.repository.save(entity);
  }

  async remove(id: T['id']): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.repository.delete(id);
  }

  async upsert(id: T['id'], data: DeepPartial<T>): Promise<T> {
    try {
      return await this.update(id, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return await this.create({ ...data, id } as DeepPartial<T>);
      }
      throw error;
    }
  }
}
