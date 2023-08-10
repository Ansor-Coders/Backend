import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdatePlanDto {
  @ApiProperty({
    example: 1000,
    description: 'The student amount of the Plan',
  })
  @IsOptional()
  @IsNumber()
  student_amount?: number;

  @ApiProperty({
    example: 100,
    description: 'The teacher amount of the Plan',
  })
  @IsOptional()
  @IsNumber()
  teacher_amount?: number;

  @ApiProperty({
    example: 100,
    description: 'The group amount of the Plan',
  })
  @IsOptional()
  @IsNumber()
  group_amount?: number;

  @ApiProperty({
    example: true,
    description: 'The status of the Plan',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}