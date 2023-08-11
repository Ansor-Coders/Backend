import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Plan } from './models/plan.model';
import { Center } from '../center/models/center.model';
import { Admin } from '../admin/models/admin.model';
import { v4 } from 'uuid';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan) private planRepository: typeof Plan) {}

  async create(createPlanDto: CreatePlanDto) {
    const plan = await this.planRepository.create({
      id: v4(),
      ...createPlanDto,
    });
    return this.getOne(plan.id);
  }

  async findAll() {
    return this.planRepository.findAll({
      attributes: [
        'id',
        'student_amount',
        'teacher_amount',
        'group_amount',
        'is_active',
      ],
      include: [
        {
          model: Center,
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
          ],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    await this.getOne(id);

    await this.planRepository.update(updatePlanDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.planRepository.update({ is_active: false }, { where: { id } });
    return this.getOne(id);
  }

  async getOne(id: string) {
    const plan = await this.planRepository.findOne({
      where: { id },
      attributes: [
        'id',
        'student_amount',
        'teacher_amount',
        'group_amount',
        'is_active',
      ],
      include: [
        {
          model: Center,
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
          ],
        },
      ],
    });
    if (!plan) {
      throw new HttpException('Plan not found', HttpStatus.NOT_FOUND);
    }
    return plan;
  }
}
