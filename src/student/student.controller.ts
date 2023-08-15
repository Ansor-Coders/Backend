import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddMoneytDto } from './dto/add-money.dto';
import { SpendMoneyDto } from './dto/spend-money.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Create a Student' })
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: 'Get all Student' })
  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'Get Student' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Student' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Delete Student' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }

  @ApiOperation({ summary: 'Add money to Balance' })
  @Post(':id/money/add')
  async addMoneyToBalance(
    @Param('id') id: string,
    @Body() addMoneytDto: AddMoneytDto,
  ) {
    return this.studentService.addMoneyToBalance(id, addMoneytDto.money);
  }

  @ApiOperation({ summary: 'Spend money from Balance' })
  @Post(':id/money/spend')
  async spendMoneyFromBalance(
    @Param('id') id: string,
    @Body() spendMoneyDto: SpendMoneyDto,
  ) {
    return this.studentService.spendMoneyFromBalance(id, spendMoneyDto);
  }
}
