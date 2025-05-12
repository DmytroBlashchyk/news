import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvValidationSchema } from 'modules/common/utils/joi-validation-for-env';
import { PostsModule } from 'modules/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormFactory } from 'modules/db/utils/typeOrmFactory';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: EnvValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeormFactory,
      inject: [ConfigService],
    }),
    PostsModule,
  ],
})
export class AppModule {}
