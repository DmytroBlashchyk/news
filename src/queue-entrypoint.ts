import { NestFactory } from '@nestjs/core';
import { QueueModule } from 'modules/queue/queue.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import {
  useLogging,
  useMaxEventListeners,
} from 'modules/app/global-middlewares';

async function bootstrap(): Promise<void> {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(QueueModule);

  useLogging(app);
  useMaxEventListeners(200);

  await app.listen();
}

bootstrap();
