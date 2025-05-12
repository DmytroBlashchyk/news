import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvValidationSchema } from 'modules/common/utils/joi-validation-for-env';
import { PostsModule } from 'modules/posts/posts.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeormFactory } from 'modules/db/utils/typeOrmFactory';
import { BullModule } from '@nestjs/bull';
import { redisFactory } from 'modules/common/utils/redisFactory';
import { HealthController } from 'modules/app/controllers/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: typeormFactory,
    //   inject: [ConfigService],
    // }),
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: redisFactory,
    }),
    PostsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
