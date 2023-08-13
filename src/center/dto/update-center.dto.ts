import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class UpdateCenterDto {
  @ApiProperty({
    example: 'Cambridge',
    description: 'The name of the Center',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Yunusobod, Toshkent',
    description: 'The address of the Center',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'true',
    description: 'The status of the Center',
  })
  @IsOptional()
  @IsBooleanString()
  is_active?: boolean;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The plan ID of the Center',
  })
  @IsOptional()
  @IsString()
  plan_id?: string;
}
