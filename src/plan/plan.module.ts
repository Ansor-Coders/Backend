import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from './models/plan.model';

@Module({
  imports: [SequelizeModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
