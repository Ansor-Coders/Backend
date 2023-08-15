import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { TeacherService } from './../teacher/teacher.service';
import { CourseService } from './../course/course.service';
import { v4 } from 'uuid';
import { Course } from '../course/models/course.model';
import { Teacher } from '../teacher/models/teacher.model';
import { GroupStudent } from '../group_student/models/group_student.model';
import { Student } from '../student/models/student.model';
import { Lesson } from '../lesson/models/lesson.model';
import { Payment } from '../payment/models/payment.model';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    private readonly courseService: CourseService,
    private readonly teacherService: TeacherService,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    await this.courseService.getOne(createGroupDto.course_id);
    await this.teacherService.getOne(createGroupDto.teacher_id);
    if (createGroupDto.assistant_id)
      await this.teacherService.getOne(createGroupDto.assistant_id);

    const group = await this.groupRepository.create({
      id: v4(),
      ...createGroupDto,
    });
    return this.getOne(group.id);
  }

  async findAll() {
    return this.groupRepository.findAll({
      attributes: [
        'id',
        'name',
        'lesson_day',
        'lesson_time',
        'duration_months',
        'is_active',
      ],
      include: [
        {
          model: Course,
          attributes: ['id', 'name', 'price', 'is_active'],
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: [
            'id',
            'first_name',
            'last_name',
            'phone',
            'gender',
            'position',
            'experience',
            'is_active',
          ],
        },
        {
          model: Teacher,
          as: 'assistant',
          attributes: [
            'id',
            'first_name',
            'last_name',
            'phone',
            'gender',
            'position',
            'experience',
            'is_active',
          ],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    await this.getOne(id);

    if (updateGroupDto.teacher_id) {
      await this.teacherService.getOne(updateGroupDto.teacher_id);
    }

    if (updateGroupDto.assistant_id) {
      await this.teacherService.getOne(updateGroupDto.assistant_id);
    }

    await this.groupRepository.update(updateGroupDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.groupRepository.update({ is_active: false }, { where: { id } });
    return this.getOne(id);
  }

  async removeAll() {
    const result = await this.findAll();

    for (let res of result) {
      await this.groupRepository.destroy({ where: { id: res.id } });
    }

    return this.findAll();
  }

  async getOne(id: string) {
    const group = await this.groupRepository.findOne({
      where: { id },
      attributes: [
        'id',
        'name',
        'lesson_day',
        'lesson_time',
        'duration_months',
        'is_active',
      ],
      include: [
        {
          model: Course,
          attributes: ['id', 'name', 'price', 'is_active'],
        },
        {
          model: Teacher,
          as: 'teacher',
          attributes: [
            'id',
            'first_name',
            'last_name',
            'phone',
            'gender',
            'position',
            'experience',
            'is_active',
          ],
        },
        {
          model: Teacher,
          as: 'assistant',
          attributes: [
            'id',
            'first_name',
            'last_name',
            'phone',
            'gender',
            'position',
            'experience',
            'is_active',
          ],
        },
        {
          model: GroupStudent,
          attributes: ['id', 'is_active'],
          include: [
            {
              model: Student,
              attributes: [
                'id',
                'first_name',
                'last_name',
                'phone',
                'phone_additional',
                'gender',
                'birth_year',
                'is_active',
              ],
            },
            {
              model: Lesson,
              attributes: ['id', 'date', 'is_come', 'is_active'],
            },
            {
              model: Payment,
              attributes: ['id', 'month', 'is_active'],
            },
          ],
        },
      ],
    });
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }
    return group;
  }
}
