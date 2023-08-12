import { Module, forwardRef } from '@nestjs/common';
import { GroupStudentService } from './group_student.service';
import { GroupStudentController } from './group_student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupStudent } from './models/group_student.model';
import { StudentModule } from '../student/student.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [
    SequelizeModule.forFeature([GroupStudent]),
    forwardRef(() => StudentModule),
    forwardRef(() => GroupModule),
  ],
  controllers: [GroupStudentController],
  providers: [GroupStudentService],
  exports: [GroupStudentService],
})
export class GroupStudentModule {}
