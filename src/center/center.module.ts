import { Module, forwardRef } from '@nestjs/common';
import { CenterService } from './center.service';
import { CenterController } from './center.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Center } from './models/center.model';
import { AdminModule } from '../admin/admin.module';
import { PlanModule } from '../plan/plan.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Center]),
    forwardRef(() => AdminModule),
    forwardRef(() => PlanModule),
  ],
  controllers: [CenterController],
  providers: [CenterService],
  exports: [CenterService],
})
export class CenterModule {}
