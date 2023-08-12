import { Module, forwardRef } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './models/course.model';
import { CenterModule } from '../center/center.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Course]),
    forwardRef(() => CenterModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
