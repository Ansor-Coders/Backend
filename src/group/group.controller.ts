import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: 'Create a Group' })
  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({ summary: 'Get all Group' })
  @Get()
  async findAll() {
    return this.groupService.findAll();
  }

  @ApiOperation({ summary: 'Get Group' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Group' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.update(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Delete Group' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.groupService.remove(id);
  }

  @Delete('/delete/all')
  async removeAll() {
    return this.groupService.removeAll();
  }
}
