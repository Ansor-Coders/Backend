import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty({
    example: 'May',
    description: 'The month of the Payment in YYYY-MM-DD format',
  })
  @IsOptional()
  @IsString()
  month?: string;

  @ApiProperty({
    example: true,
    description: 'The status of the Payment',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
