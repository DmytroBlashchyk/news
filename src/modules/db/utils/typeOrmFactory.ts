import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnvEnum } from 'modules/common/enums/config-env.enum';
import { Environments } from 'modules/common/enums/environments.enum';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export function typeormFactory(
  config: ConfigService,
): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
  const currentEnvironment = config.get<string>(ConfigEnvEnum.NODE_ENV);
  const isTesting = currentEnvironment === Environments.Testing;
  const sslConfig =
    currentEnvironment === Environments.Production
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {};

  return {
    type: 'postgres',
    entities: [join(__dirname, '/../../../**/**.entity{.js,.ts}')],
    migrationsTableName: 'migrations',
    synchronize: false,
    dropSchema: false,
    migrationsRun: !isTesting,
    logging: true,
    logger: 'advanced-console',
    namingStrategy: new SnakeNamingStrategy(),
    host: config.get<string>(ConfigEnvEnum.DB_HOST),
    username: config.get<string>(ConfigEnvEnum.DB_USER),
    password: config.get<string>(ConfigEnvEnum.DB_PASSWORD),
    ...sslConfig,
  };
}
