import { LoggingService } from 'modules/logging/services/logging.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvEnum } from 'modules/common/enums/config-env.enum';
import { Environments } from 'modules/common/enums/environments.enum';
import * as Sentry from '@sentry/node';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SentryLoggingService extends LoggingService {
  private readonly IS_DEBUG_ENABLED: boolean;
  constructor(private readonly configService: ConfigService) {
    super();
    this.IS_DEBUG_ENABLED =
      configService.get(ConfigEnvEnum.NODE_ENV) === Environments.Development;
  }

  error(message: any, trace?: string, context?: string): void {
    if (trace) {
      Sentry.setExtra('trace', trace);
    }
    Sentry.captureException(message);
  }

  log(message: any, context?: string): void {
    Sentry.addBreadcrumb({ message });
    this.sendSentryCaptureMessage({ name: message, extraData: context });
  }

  sendSentryCaptureMessage(payload: {
    name: string;
    extraData: any;
    visibleFiltered?: boolean;
  }): void | string {
    // return payload.visibleFiltered
    //   ? Sentry.withScope((scope) => {
    //       scope.setLevel(Sentry.Severity.Info);
    //       scope.setExtra('extraData', payload.extraData);
    //       Sentry.captureMessage(payload.name);
    //     })
    //   : Sentry.captureMessage(payload.name, {
    //       level: Sentry.Severity.Info,
    //       extra: {
    //         ...payload.extraData,
    //       },
    //     });
  }

  warn(message: any, context?: string): void {
    Sentry.addBreadcrumb({ message });
  }

  debug(message: any, context?: string): void {
    if (!this.IS_DEBUG_ENABLED) return;

    Sentry.addBreadcrumb({ message });
  }

  verbose(message: any, context?: string): void {
    Sentry.addBreadcrumb({ message });
  }

  sentryInstance() {
    return Sentry;
  }
}
