import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { JwtService } from '@nestjs/jwt';
import { LoginTeacherDto } from './dto/login-teacher.dto';
import { compare, hash } from 'bcryptjs';
import { CenterService } from './../center/center.service';
import { v4 } from 'uuid';
import { Center } from '../center/models/center.model';
import { Plan } from '../plan/models/plan.model';
import { Group } from '../group/models/group.model';
import { Course } from '../course/models/course.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher) private teacherRepository: typeof Teacher,
    private readonly centerService: CenterService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginTeacherDto: LoginTeacherDto) {
    const { phone, password } = loginTeacherDto;
    const teacherByPhone = await this.getTeacherByPhone(phone);
    if (!teacherByPhone) {
      throw new UnauthorizedException('Phone or password is wrong');
    }
    const isMatchPass = await compare(password, teacherByPhone.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Phone or password is wrong');
    }
    const token = await this.getToken(teacherByPhone);
    const teacher = await this.getOne(teacherByPhone.id);
    const response = {
      token,
      teacher,
    };
    return response;
  }

  async create(createTeacherDto: CreateTeacherDto) {
    await this.centerService.getOne(createTeacherDto.center_id);

    const teacherByPhone = await this.getTeacherByPhone(createTeacherDto.phone);
    if (teacherByPhone) {
      throw new BadRequestException('Phone already registered!');
    }
    const hashed_password = await hash(createTeacherDto.password, 7);
    const teacher = await this.teacherRepository.create({
      id: v4(),
      ...createTeacherDto,
      hashed_password,
    });
    return this.getOne(teacher.id);
  }

  async findAll() {
    return this.teacherRepository.findAll({
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

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    await this.getOne(id);

    if (updateTeacherDto.phone) {
      const teacherByPhone = await this.getTeacherByPhone(
        updateTeacherDto.phone,
      );
      if (teacherByPhone && teacherByPhone.id != id) {
        throw new BadRequestException('Phone already registered!');
      }
    }

    if (updateTeacherDto.password) {
      const hashed_password = await hash(updateTeacherDto.password, 7);
      await this.teacherRepository.update(
        { hashed_password },
        { where: { id } },
      );
    }

    await this.teacherRepository.update(updateTeacherDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.teacherRepository.update(
      { is_active: false },
      { where: { id } },
    );
    return this.getOne(id);
  }

  async getOne(id: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
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
      include: [
        {
          model: Center,
          attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
          include: [
            {
              model: Plan,
              attributes: [
                'id',
                'name',
                'price',
                'student_amount',
                'is_active',
              ],
            },
          ],
        },
        {
          model: Group,
          as: 'group_teacher',
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
          ],
        },
        {
          model: Group,
          as: 'group_assistant',
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
          ],
        },
      ],
    });
    if (!teacher) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return teacher;
  }

  async getTeacherByPhone(phone: string) {
    const teacher = await this.teacherRepository.findOne({
      where: { phone },
      attributes: ['id', 'phone', 'hashed_password'],
    });
    return teacher;
  }

  async getToken(teacher: Teacher) {
    try {
      const jwtPayload = {
        id: teacher.id,
        phone: teacher.phone,
        role: 'TEACHER',
      };
      const token = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.TOKEN_KEY,
        expiresIn: process.env.TOKEN_TIME,
      });
      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
