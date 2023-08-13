import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class LoginTeacherDto {
  @ApiProperty({
    example: '+998991234511',
    description: 'The phone of the Teacher',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'teacher',
    description: 'The password of the Teacher',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
