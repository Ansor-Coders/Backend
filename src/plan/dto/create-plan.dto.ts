import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    example: 'Basic',
    description: 'The name of the Plan',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 175000,
    description: 'The price of the Plan',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 1000,
    description: 'The student amount of the Plan',
  })
  @IsNotEmpty()
  @IsNumber()
  student_amount: number;
}
