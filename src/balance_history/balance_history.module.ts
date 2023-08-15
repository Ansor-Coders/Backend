import { Module, forwardRef } from '@nestjs/common';
import { BalanceHistoryService } from './balance_history.service';
import { BalanceHistoryController } from './balance_history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BalanceHistory } from './models/balance_history.model';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([BalanceHistory]),
    forwardRef(() => StudentModule),
  ],
  controllers: [BalanceHistoryController],
  providers: [BalanceHistoryService],
  exports: [BalanceHistoryService],
})
export class BalanceHistoryModule {}
