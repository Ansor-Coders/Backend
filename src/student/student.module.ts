import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { CenterModule } from '../center/center.module';
import { BalanceHistoryModule } from '../balance_history/balance_history.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Student]),
    forwardRef(() => CenterModule),
    forwardRef(() => BalanceHistoryModule),
    forwardRef(() => PaymentModule),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
