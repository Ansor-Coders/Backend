import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupStudentDto } from './dto/create-group_student.dto';
import { UpdateGroupStudentDto } from './dto/update-group_student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { GroupStudent } from './models/group_student.model';
import { StudentService } from './../student/student.service';
import { GroupService } from './../group/group.service';
import { v4 } from 'uuid';
import { Student } from '../student/models/student.model';
import { Group } from '../group/models/group.model';

@Injectable()
export class GroupStudentService {
  constructor(
    @InjectModel(GroupStudent)
    private groupStudentRepository: typeof GroupStudent,
    private readonly studentService: StudentService,
    private readonly groupService: GroupService,
  ) {}

  async create(createGroupStudentDto: CreateGroupStudentDto) {
    await this.studentService.getOne(createGroupStudentDto.student_id);
    await this.groupService.getOne(createGroupStudentDto.group_id);

    const groupStudent = await this.groupStudentRepository.create({
      id: v4(),
      ...createGroupStudentDto,
    });
    return this.getOne(groupStudent.id);
  }

  async findAll() {
    return this.groupStudentRepository.findAll({
      attributes: ['id', 'is_active'],
      include: [
        {
          model: Student,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'phone',
            'phone_additional',
            'gender',
            'birth_year',
            'is_active',
          ],
        },
        {
          model: Group,
          attributes: [
            'id',
            'name',
            'lesson_day',
            'lesson_time',
            'duration_months',
            'is_active',
          ],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateGroupStudentDto: UpdateGroupStudentDto) {
    await this.getOne(id);

    await this.groupStudentRepository.update(updateGroupStudentDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.groupStudentRepository.update(
      { is_active: false },
      { where: { id } },
    );
    return this.getOne(id);
  }

  async getOne(id: string) {
    const groupStudent = await this.groupStudentRepository.findOne({
      where: { id },
      attributes: ['id', 'is_active'],
      include: [
        {
          model: Student,
          attributes: [
            'id',
            'first_name',
            'last_name',
            'phone',
            'phone_additional',
            'gender',
            'birth_year',
            'is_active',
          ],
        },
        {
          model: Group,
          attributes: [
            'id',
            'name',
            'lesson_day',
            'lesson_time',
            'duration_months',
            'is_active',
          ],
        },
      ],
    });
    if (!groupStudent) {
      throw new HttpException('Group Student not found', HttpStatus.NOT_FOUND);
    }
    return groupStudent;
  }
}
