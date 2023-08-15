import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './models/lesson.model';
import { GroupStudentService } from './../group_student/group_student.service';
import { v4 } from 'uuid';
import { GroupStudent } from '../group_student/models/group_student.model';
import { Group } from '../group/models/group.model';
import { Student } from '../student/models/student.model';
import { Center } from '../center/models/center.model';
import { Course } from '../course/models/course.model';
import { Teacher } from '../teacher/models/teacher.model';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson) private lessonRepository: typeof Lesson,
    private readonly groupStudentService: GroupStudentService,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    await this.groupStudentService.getOne(createLessonDto.group_student_id);
    await this.checkDate(createLessonDto);

    const lesson = await this.lessonRepository.create({
      id: v4(),
      ...createLessonDto,
    });
    return this.getOne(lesson.id);
  }

  async findAll() {
    return this.lessonRepository.findAll({
      attributes: ['id', 'date', 'is_come', 'is_active'],
      include: [
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
              model: Group,
              attributes: [
                'id',
                'name',
                'lesson_day',
                'lesson_time',
                'duration_months',
                'is_active',
              ],
            },
          ],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    await this.getOne(id);

    await this.lessonRepository.update(updateLessonDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.lessonRepository.update({ is_active: false }, { where: { id } });
    return this.getOne(id);
  }

  async getOne(id: string) {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      attributes: ['id', 'date', 'is_come', 'is_active'],
      include: [
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
              include: [
                {
                  model: Center,
                  attributes: [
                    'id',
                    'name',
                    'address',
                    'image_name',
                    'is_active',
                  ],
                },
              ],
            },
            {
              model: Group,
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
            },
          ],
        },
      ],
    });
    if (!lesson) {
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
    }
    return lesson;
  }

  async checkDate(createLessonDto: CreateLessonDto) {
    const lesson = await this.lessonRepository.findOne({
      where: { ...createLessonDto },
      attributes: ['id', 'date', 'group_student_id'],
    });
    if (lesson) {
      throw new BadRequestException('Date already created!');
    }
    return true;
  }
}
