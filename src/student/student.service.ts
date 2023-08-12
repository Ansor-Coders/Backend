import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { CenterService } from '../center/center.service';
import { v4 } from 'uuid';
import { Center } from '../center/models/center.model';
import { GroupStudent } from '../group_student/models/group_student.model';
import { Group } from '../group/models/group.model';
import { Course } from '../course/models/course.model';
import { Teacher } from '../teacher/models/teacher.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly centerService: CenterService,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    await this.centerService.getOne(createStudentDto.center_id);

    const studentByPhone = await this.getStudentByPhone(createStudentDto.phone);
    if (studentByPhone) {
      throw new BadRequestException('Phone already registered!');
    }
    const student = await this.studentRepository.create({
      id: v4(),
      ...createStudentDto,
    });
    return this.getOne(student.id);
  }

  async findAll() {
    return this.studentRepository.findAll({
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
          attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    await this.getOne(id);

    if (updateStudentDto.phone) {
      const StudentByPhone = await this.getStudentByPhone(
        updateStudentDto.phone,
      );
      if (StudentByPhone && StudentByPhone.id != id) {
        throw new BadRequestException('Phone already registered!');
      }
    }

    await this.studentRepository.update(updateStudentDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.studentRepository.update(
      { is_active: false },
      { where: { id } },
    );
    return this.getOne(id);
  }

  async getOne(id: string) {
    const student = await this.studentRepository.findOne({
      where: { id },
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
          attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
        },
        {
          model: GroupStudent,
          attributes: ['id', 'is_active'],
          include: [
            {
              model: Group,
              attributes: [
                'id',
                'name',
                'lesson_day',
                'lesson_time',
                'image_name',
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
                    'position',
                    'experience',
                    'image_name',
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
                    'position',
                    'experience',
                    'image_name',
                    'is_active',
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  async getStudentByPhone(phone: string) {
    const student = await this.studentRepository.findOne({
      where: { phone },
      attributes: ['id', 'phone'],
    });
    return student;
  }
}
