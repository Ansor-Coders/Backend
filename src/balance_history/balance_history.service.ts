import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateBalanceHistoryDto } from './dto/create-balance_history.dto';
import { UpdateBalanceHistoryDto } from './dto/update-balance_history.dto';
import { BalanceHistory } from './models/balance_history.model';
import { InjectModel } from '@nestjs/sequelize';
import { StudentService } from './../student/student.service';
import { v4 } from 'uuid';
import { Student } from '../student/models/student.model';
import { Payment } from '../payment/models/payment.model';

@Injectable()
export class BalanceHistoryService {
  constructor(
    @InjectModel(BalanceHistory)
    private balanceHistoryRepository: typeof BalanceHistory,
    @Inject(forwardRef(() => StudentService))
    private readonly studentService: StudentService,
  ) {}

  async create(createBalanceHistoryDto: CreateBalanceHistoryDto) {
    await this.studentService.getOne(createBalanceHistoryDto.student_id);

    const balanceHistory = await this.balanceHistoryRepository.create({
      id: v4(),
      ...createBalanceHistoryDto,
    });
    return this.getOne(balanceHistory.id);
  }

  async findAll() {
    return this.balanceHistoryRepository.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'money', 'is_added', 'is_active', 'createdAt'],
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
          model: Payment,
          attributes: ['id', 'month', 'is_active'],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateBalanceHistoryDto: UpdateBalanceHistoryDto) {
    await this.getOne(id);

    await this.balanceHistoryRepository.update(updateBalanceHistoryDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.balanceHistoryRepository.update(
      { is_active: false },
      { where: { id } },
    );
    return this.getOne(id);
  }

  async getOne(id: string) {
    const balanceHistory = await this.balanceHistoryRepository.findOne({
      where: { id },
      attributes: ['id', 'money', 'is_added', 'is_active', 'createdAt'],
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
            'balance',
            'is_active',
          ],
        },
        {
          model: Payment,
          attributes: ['id', 'month', 'is_active'],
        },
      ],
    });
    if (!balanceHistory) {
      throw new HttpException(
        'Balance History not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return balanceHistory;
  }
}
