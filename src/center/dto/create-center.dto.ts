import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCenterDto {
  @ApiProperty({
    example: 'Cambridge',
    description: 'The name of the Center',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Yunusobod, Toshkent',
    description: 'The address of the Center',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The admin ID of the Center',
  })
  @IsNotEmpty()
  @IsString()
  admin_id: string;

  @ApiProperty({
    example: 'f68b71d0-a07f-4dd6-bf12-bbc6aaeb510a',
    description: 'The plan ID of the Center',
  })
  @IsNotEmpty()
  @IsString()
  plan_id: string;
}
