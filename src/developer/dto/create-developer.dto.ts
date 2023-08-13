import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @ApiProperty({
    example: 'john11',
    description: 'The username of the Developer',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'developer',
    description: 'The password of the Developer',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
