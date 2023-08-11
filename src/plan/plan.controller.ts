import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Plan')
@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: 'Create a Plan' })
  @Post()
  async create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @ApiOperation({ summary: 'Get all Plan' })
  @Get()
  async findAll() {
    return this.planService.findAll();
  }

  @ApiOperation({ summary: 'Get Plan' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Plan' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @ApiOperation({ summary: 'Delete Plan' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }
}
