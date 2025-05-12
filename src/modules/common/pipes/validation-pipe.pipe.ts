import {
  PipeTransform,
  ArgumentMetadata,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Environments } from 'modules/common/enums/environments.enum';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.needsValidation(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    const errors = await validate(object, {
      whitelist: true,
    });

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: this.buildErrors(errors),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    this.handleDebugLogging(object);

    return object;
  }

  private buildErrors(errors: ValidationError[], prefix = '') {
    let result: Record<string, string> = {};

    for (const err of errors) {
      if (err.children.length > 0) {
        const nestedErrors = this.buildErrors(
          err.children,
          `${prefix}${err.property}.`,
        );

        result = { ...result, ...nestedErrors };
        continue;
      }

      Object.entries(err.constraints).forEach((constraint) => {
        result[`${prefix}${err.property}`] = `${constraint[1]}`;
      });
    }

    return result;
  }

  private handleDebugLogging(payload: Record<string, unknown>) {
    if (process.env.NODE_ENV === Environments.Development) {
      // eslint-disable-next-line no-console
      console.log(payload);
    }
  }

  private needsValidation(metatype: unknown): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
