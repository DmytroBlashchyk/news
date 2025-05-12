import { LoggingService } from 'modules/logging/services/logging.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CliLoggingService extends LoggingService {
  log(...data: unknown[]): void {
    // eslint-disable-next-line no-console
    console.log(...data);
  }

  debug(...data: unknown[]): void {
    // eslint-disable-next-line no-console
    console.debug(...data);
  }
}
