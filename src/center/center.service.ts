import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Center } from './models/center.model';
import { AdminService } from './../admin/admin.service';
import { PlanService } from './../plan/plan.service';
import { Plan } from '../plan/models/plan.model';
import { Admin } from '../admin/models/admin.model';
import { v4 } from 'uuid';
import { Course } from '../course/models/course.model';
import { Teacher } from '../teacher/models/teacher.model';
import { Student } from '../student/models/student.model';

@Injectable()
export class CenterService {
  constructor(
    @InjectModel(Center) private centerRepository: typeof Center,
    private readonly adminService: AdminService,
    private readonly planService: PlanService,
  ) {}

  async create(createCenterDto: CreateCenterDto) {
    await this.adminService.getOne(createCenterDto.admin_id);
    await this.planService.getOne(createCenterDto.plan_id);

    const center = await this.centerRepository.create({
      id: v4(),
      ...createCenterDto,
    });
    return this.getOne(center.id);
  }

  async findAll() {
    return this.centerRepository.findAll({
      attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
      include: [
        {
          model: Admin,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'phone',
            'image_name',
            'username',
            'is_active',
          ],
        },
        {
          model: Plan,
          attributes: [
            'id',
            'name',
            'price',
            'student_amount',
            'teacher_amount',
            'group_amount',
            'is_active',
          ],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateCenterDto: UpdateCenterDto) {
    await this.getOne(id);

    if (updateCenterDto.plan_id) {
      await this.planService.getOne(updateCenterDto.plan_id);
    }

    await this.centerRepository.update(updateCenterDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.centerRepository.update({ is_active: false }, { where: { id } });
    return this.getOne(id);
  }

  async getOne(id: string) {
    const center = await this.centerRepository.findOne({
      where: { id },
      attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
      include: [
        {
          model: Admin,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'phone',
            'image_name',
            'username',
            'is_active',
          ],
        },
        {
          model: Plan,
          attributes: [
            'id',
            'name',
            'price',
            'student_amount',
            'teacher_amount',
            'group_amount',
            'is_active',
          ],
        },
        {
          model: Course,
          attributes: ['id', 'name', 'price', 'is_active'],
        },
        {
          model: Teacher,
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
      ],
    });
    if (!center) {
      throw new HttpException('Center not found', HttpStatus.NOT_FOUND);
    }
    return center;
  }
}
