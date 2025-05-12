import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

const HAS_MIME_TYPE = ['image/jpeg', 'image/png', 'image/gif'];

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneKb = 3000000;
    if (value === undefined) {
      return value;
    }
    if (value.size > oneKb) {
      throw new BadRequestException('Maximum file size is 3MB');
    }

    if (!HAS_MIME_TYPE.includes(value.mimetype)) {
      throw new BadRequestException(
        `File must be of one of the types ${HAS_MIME_TYPE.join(', ')}`,
      );
    }
    return value;
  }
}
