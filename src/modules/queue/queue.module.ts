import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvValidationSchema } from 'modules/common/utils/joi-validation-for-env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
    }),
  ],
})
export class QueueModule {}
