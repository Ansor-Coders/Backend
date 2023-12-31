import { Module, forwardRef } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { JwtModule } from '@nestjs/jwt';
import { CenterModule } from '../center/center.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Teacher]),
    forwardRef(() => CenterModule),
    JwtModule,
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
