import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupStudentService } from './group_student.service';
import { CreateGroupStudentDto } from './dto/create-group_student.dto';
import { UpdateGroupStudentDto } from './dto/update-group_student.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Group Student')
@Controller('group-student')
export class GroupStudentController {
  constructor(private readonly groupStudentService: GroupStudentService) {}

  @ApiOperation({ summary: 'Create a Group Student' })
  @Post()
  async create(@Body() createGroupStudentDto: CreateGroupStudentDto) {
    return this.groupStudentService.create(createGroupStudentDto);
  }

  @ApiOperation({ summary: 'Get all Group Student' })
  @Get()
  async findAll() {
    return this.groupStudentService.findAll();
  }

  @ApiOperation({ summary: 'Get Group Student' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.groupStudentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Group Student' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupStudentDto: UpdateGroupStudentDto,
  ) {
    return this.groupStudentService.update(id, updateGroupStudentDto);
  }

  @ApiOperation({ summary: 'Delete Group Student' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.groupStudentService.remove(id);
  }
}
