/**
 * Base Service Abstract Class
 *
 * Provides a generic foundation for TypeORM services, encapsulating common
 * CRUD operations to reduce boilerplate in feature-specific services.
 *
 * Extending classes must inject the appropriate entity repository into `super()`.
 */
import { NotFoundException } from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  DeleteResult,
  FindOptionsWhere,
  QueryDeepPartialEntity,
} from 'typeorm';

/**
 * Abstract class providing standard database operations.
 *
 * @template T Entity type, must contain at least an 'id' field of type number or string.
 */
export abstract class BaseService<T extends { id: number | string }> {
  /**
   * @param repository The TypeORM repository instance for the entity.
   */
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * Retrieves all entities matching the given options.
   *
   * @param options TypeORM find options.
   * @returns A promise resolving to an array of entities.
   */
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  /**
   * Retrieves a single entity by its ID.
   *
   * @param id The entity's primary key.
   * @param options Additional TypeORM find options.
   * @returns A promise resolving to the entity.
   * @throws NotFoundException if the entity does not exist.
   */
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

  /**
   * Creates and saves a new entity.
   *
   * @param data Partial entity data to be saved.
   * @returns A promise resolving to the newly created entity.
   */
  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  /**
   * Updates an existing entity by its ID.
   *
   * @param id The entity's primary key.
   * @param data Partial entity data to apply.
   * @returns A promise resolving to the updated entity.
   * @throws NotFoundException if the entity does not exist.
   */
  async update(id: T['id'], data: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    this.repository.merge(entity, data);
    return await this.repository.save(entity);
  }

  /**
   * Deletes an entity by its ID.
   *
   * @param id The entity's primary key.
   * @returns A promise resolving to the deletion result.
   * @throws NotFoundException if the entity does not exist.
   */
  async remove(id: T['id']): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.repository.delete(id);
  }

  /**
   * Updates an existing entity or creates a new one if it does not exist.
   * Relies on the database constraints (like primary keys or unqiue constraints) to perform the atomic upsert.
   *
   * @param id The entity's primary key.
   * @param data Partial entity data to upsert.
   * @returns A promise resolving to the upserted entity.
   */
  async upsert(id: T['id'], data: DeepPartial<T>): Promise<T> {
    await this.repository.upsert(
      { ...data, id } as QueryDeepPartialEntity<T>,
      ['id'] as string[],
    );
    return await this.findOne(id);
  }
}
