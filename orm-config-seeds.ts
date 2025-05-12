import * as process from 'process';

require('dotenv').config({ path: '.env' });

import { ConnectionOptions, DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

console.log(
  `TypeOrm is configured to connect to: ${process.env.DB_NAME}, NODE_ENV=${process.env.NODE_ENV}`,
);

const isProduction = process.env.NODE_ENV === 'production';
const sslConfig = isProduction
  ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {};

const config: ConnectionOptions = {
  type: 'postgres',
  entities: isProduction
    ? [__dirname + '/dist/src/modules/**/entities/*.entity.js']
    : [__dirname + '/src/modules/**/entities/*.entity.ts'],
  database: process.env.DB_NAME,
  logging: true,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT_MASTER ?? '5432'),
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'seeds',
  migrations: isProduction
    ? [__dirname + '/dist/src/modules/db/seeds./*.js']
    : [__dirname + '/src/modules/db/seeds/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  ...sslConfig,
};

export default new DataSource({
  ...config,
});
