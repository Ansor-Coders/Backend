import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDeveloperDto {
  @ApiProperty({
    example: 'john77',
    description: 'The username of the Developer',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the Developer',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
