import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AdminModule } from './admin/admin.module';
import { PlanModule } from './plan/plan.module';
import { CenterModule } from './center/center.module';
import { Admin } from './admin/models/admin.model';
import { Plan } from './plan/models/plan.model';
import { Center } from './center/models/center.model';
import { TelegramService } from './telegram/telegram.service';
import { TelegramUpdate } from './telegram/telegram.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: MyBotName,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [],
      }),
    }),
    ServeStaticModule.forRoot({ rootPath: resolve(__dirname, 'static') }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: String(process.env.PG_PASSWORD),
      database: process.env.PG_DB,
      autoLoadModels: true,
      logging: false,
      ssl: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      models: [Admin, Plan, Center],
    }),
    AdminModule,
    PlanModule,
    CenterModule,
  ],
  controllers: [],
  providers: [TelegramService, TelegramUpdate],
})
export class AppModule {}
