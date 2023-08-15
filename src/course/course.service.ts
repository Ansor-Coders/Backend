import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './models/course.model';
import { v4 } from 'uuid';
import { CenterService } from '../center/center.service';
import { Group } from '../group/models/group.model';
import { Teacher } from '../teacher/models/teacher.model';
import { Center } from '../center/models/center.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseRepository: typeof Course,
    private readonly centerService: CenterService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    await this.centerService.getOne(createCourseDto.center_id);

    const course = await this.courseRepository.create({
      id: v4(),
      ...createCourseDto,
    });
    return this.getOne(course.id);
  }

  async findAll() {
    return this.courseRepository.findAll({
      attributes: ['id', 'name', 'price', 'is_active'],
      include: [
        {
          model: Center,
          attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    await this.getOne(id);

    await this.courseRepository.update(updateCourseDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.courseRepository.update({ is_active: false }, { where: { id } });
    return this.getOne(id);
  }

  async getOne(id: string) {
    const сourse = await this.courseRepository.findOne({
      where: { id },
      attributes: ['id', 'name', 'price', 'is_active'],
      include: [
        {
          model: Center,
          attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
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
    });
    if (!сourse) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    return сourse;
  }
}
