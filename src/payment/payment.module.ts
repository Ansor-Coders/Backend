import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { GroupStudentModule } from '../group_student/group_student.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment]),
    forwardRef(() => GroupStudentModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
