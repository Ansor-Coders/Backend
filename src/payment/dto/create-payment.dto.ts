import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 'May',
    description: 'The month of the Payment in YYYY-MM-DD format',
  })
  @IsNotEmpty()
  @IsString()
  month: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The group student ID of the Payment',
  })
  @IsNotEmpty()
  @IsString()
  group_student_id: string;
}
