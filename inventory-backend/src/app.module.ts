import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {validate} from "./common/validation/env.validation";
import databaseConfig from "./config/database.config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
import { AssetsModule } from './assets/assets.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        validate,
        load: [databaseConfig]
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            type: 'postgres',
            ...configService.get<PostgresConnectionOptions>('database'),
            autoLoadEntities: true,
            synchronize: true,
          };
        }
      }),
      AssetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
