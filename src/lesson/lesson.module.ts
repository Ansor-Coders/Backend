import { Module, forwardRef } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from './models/lesson.model';
import { GroupStudentModule } from '../group_student/group_student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Lesson]),
    forwardRef(() => GroupStudentModule),
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
