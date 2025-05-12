import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvEnum } from 'modules/common/enums/config-env.enum';
import {
  useCors,
  useExceptionFilters,
  useLogging,
  useMaxEventListeners,
  useSerialization,
  useSwagger,
  useValidation,
} from 'modules/app/global-middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  useCors(app);
  useSwagger(app);
  useValidation(app);
  useExceptionFilters(app);
  useLogging(app);
  useSerialization(app);
  useMaxEventListeners(200);
  await app.listen(configService.get(ConfigEnvEnum.APP_PORT));
}
bootstrap();
