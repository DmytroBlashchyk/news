import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class TransactionalService {
  constructor(private readonly dataSource: DataSource) {}

  async runInTransaction<T>(
    callback: (queryRunner: QueryRunner) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const errorMessage =
        error.response?.message || 'Transaction execution error';
      const errorStatus = error.status || 500;
      throw new HttpException(
        {
          message: errorMessage,
          error: error.response.error,
          statusCode: errorStatus,
        },
        errorStatus,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
