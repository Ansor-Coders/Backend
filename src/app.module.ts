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
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { GroupModule } from './group/group.module';
import { GroupStudentModule } from './group_student/group_student.module';
import { Teacher } from './teacher/models/teacher.model';
import { Student } from './student/models/student.model';
import { Group } from './group/models/group.model';
import { GroupStudent } from './group_student/models/group_student.model';
import { CourseModule } from './course/course.module';
import { Course } from './course/models/course.model';
import { TelegramService } from './telegram/telegram.service';
import { TelegramUpdate } from './telegram/telegram.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { MyBotName } from './telegram/telegram.constants';
import { LessonModule } from './lesson/lesson.module';
import { PaymentModule } from './payment/payment.module';
import { DeveloperModule } from './developer/developer.module';
import { Developer } from './developer/models/developer.model';
import { Lesson } from './lesson/models/lesson.model';
import { Payment } from './payment/models/payment.model';
import { ImageModule } from './image/image.module';
import { BalanceHistoryModule } from './balance_history/balance_history.module';
import { BalanceHistory } from './balance_history/models/balance_history.model';

@Module({
  imports: [
    // TelegrafModule.forRootAsync({
    //   botName: MyBotName,
    //   useFactory: () => ({
    //     token: process.env.BOT_TOKEN,
    //     middlewares: [],
    //     include: [],
    //   }),
    // }),
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
      models: [
        Developer,
        Admin,
        Plan,
        Center,
        Course,
        Teacher,
        Student,
        Group,
        GroupStudent,
        Lesson,
        Payment,
        BalanceHistory,
      ],
    }),
    DeveloperModule,
    AdminModule,
    PlanModule,
    CenterModule,
    CourseModule,
    TeacherModule,
    StudentModule,
    GroupModule,
    GroupStudentModule,
    LessonModule,
    PaymentModule,
    ImageModule,
    BalanceHistoryModule,
  ],
  controllers: [],
  // providers: [TelegramService, TelegramUpdate],
})
export class AppModule {}
