import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { GroupStudentService } from '../group_student/group_student.service';
import { v4 } from 'uuid';
import { GroupStudent } from '../group_student/models/group_student.model';
import { Student } from '../student/models/student.model';
import { Group } from '../group/models/group.model';
import { Course } from '../course/models/course.model';
import { Teacher } from '../teacher/models/teacher.model';
import { Center } from '../center/models/center.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentRepository: typeof Payment,
    private readonly groupStudentService: GroupStudentService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    await this.groupStudentService.getOne(createPaymentDto.group_student_id);

    const payment = await this.paymentRepository.create({
      id: v4(),
      ...createPaymentDto,
    });
    return this.getOne(payment.id);
  }

  async findAll() {
    return this.paymentRepository.findAll({
      attributes: ['id', 'month', 'is_active'],
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

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    await this.getOne(id);

    await this.paymentRepository.update(updatePaymentDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.paymentRepository.update(
      { is_active: false },
      { where: { id } },
    );
    return this.getOne(id);
  }

  async getOne(id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      attributes: ['id', 'month', 'is_active'],
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
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }
}
