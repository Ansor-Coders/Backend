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
import { Lesson } from '../lesson/models/lesson.model';
import { Payment } from '../payment/models/payment.model';
import { BalanceHistory } from '../balance_history/models/balance_history.model';
import { BalanceHistoryService } from './../balance_history/balance_history.service';
import { PaymentService } from './../payment/payment.service';
import { SpendMoneyDto } from './dto/spend-money.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    private readonly centerService: CenterService,
    private readonly balanceHistoryService: BalanceHistoryService,
    private readonly paymentService: PaymentService,
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
      order: [['createdAt', 'DESC']],
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
      const studentByPhone = await this.getStudentByPhone(
        updateStudentDto.phone,
      );
      if (studentByPhone && studentByPhone.id != id) {
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
      order: [
        [{ model: BalanceHistory, as: 'balanceHistory' }, 'createdAt', 'DESC'],
        [{ model: GroupStudent, as: 'groupStudent' }, 'createdAt', 'DESC'],
        [
          { model: GroupStudent, as: 'groupStudent' },
          { model: Lesson, as: 'lesson' },
          'date',
          'DESC',
        ],
        [
          { model: GroupStudent, as: 'groupStudent' },
          { model: Payment, as: 'payment' },
          'createdAt',
          'DESC',
        ],
      ],
      attributes: [
        'id',
        'first_name',
        'last_name',
        'phone',
        'phone_additional',
        'gender',
        'birth_year',
        'balance',
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
            {
              model: Lesson,
              attributes: ['id', 'date', 'is_come', 'is_active'],
            },
            {
              model: Payment,
              attributes: ['id', 'month', 'is_active'],
              include: [
                {
                  model: BalanceHistory,
                  attributes: [
                    'id',
                    'money',
                    'is_added',
                    'is_active',
                    'createdAt',
                  ],
                },
              ],
            },
          ],
        },
        {
          model: BalanceHistory,
          attributes: ['id', 'money', 'is_added', 'is_active', 'createdAt'],
          include: [
            {
              model: Payment,
              attributes: ['id', 'month', 'is_active'],
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

  async addMoneyToBalance(id: string, money: number) {
    const student = await this.getOne(id);

    const balanceHistory = await this.balanceHistoryService.create({
      money,
      is_added: true,
      student_id: student.id,
    });

    await this.studentRepository.update(
      { balance: student.balance + money },
      {
        where: { id },
      },
    );

    return this.balanceHistoryService.getOne(balanceHistory.id);
  }

  async spendMoneyFromBalance(id: string, spendMoneyDto: SpendMoneyDto) {
    const student = await this.getOne(id);

    if (student.balance < spendMoneyDto.money) {
      throw new BadRequestException('There is not enough money!');
    }

    const balanceHistory = await this.balanceHistoryService.create({
      money: spendMoneyDto.money,
      is_added: false,
      student_id: student.id,
    });

    await this.paymentService.create({
      ...spendMoneyDto,
      balance_history_id: balanceHistory.id,
    });

    await this.studentRepository.update(
      { balance: student.balance - spendMoneyDto.money },
      {
        where: { id },
      },
    );

    return this.balanceHistoryService.getOne(balanceHistory.id);
  }
}
