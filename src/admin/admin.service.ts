import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { compare, hash } from 'bcryptjs';
import { Center } from '../center/models/center.model';
import { Plan } from '../plan/models/plan.model';
import { v4 } from 'uuid';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAdminDto: LoginAdminDto) {
    const { username, password } = loginAdminDto;
    const adminByUsername = await this.getAdminByUsername(username);
    if (!adminByUsername) {
      throw new UnauthorizedException('Username or password is wrong');
    }
    const isMatchPass = await compare(
      password,
      adminByUsername.hashed_password,
    );
    if (!isMatchPass) {
      throw new UnauthorizedException('Username or password is wrong');
    }
    const token = await this.getToken(adminByUsername);
    const admin = await this.getOne(adminByUsername.id);
    const response = {
      token,
      admin,
    };
    return response;
  }

  async create(createAdminDto: CreateAdminDto) {
    const adminByPhone = await this.getAdminByPhone(createAdminDto.phone);
    if (adminByPhone) {
      throw new BadRequestException('Phone already registered!');
    }
    const adminByUsername = await this.getAdminByUsername(
      createAdminDto.username,
    );
    if (adminByUsername) {
      throw new BadRequestException('Username already registered!');
    }
    const hashed_password = await hash(createAdminDto.password, 7);
    const admin = await this.adminRepository.create({
      id: v4(),
      ...createAdminDto,
      hashed_password,
    });
    return this.getOne(admin.id);
  }

  async findAll() {
    return this.adminRepository.findAll({
      attributes: [
        'id',
        'first_name',
        'last_name',
        'phone',
        'image_name',
        'username',
        'is_active',
      ],
      include: [
        {
          model: Center,
          attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
          include: [
            {
              model: Plan,
              attributes: [
                'id',
                'name',
                'price',
                'student_amount',
                'teacher_amount',
                'group_amount',
                'is_active',
              ],
            },
          ],
        },
      ],
    });
  }

  async findOne(id: string) {
    return this.getOne(id);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    await this.getOne(id);

    if (updateAdminDto.phone) {
      const adminByPhone = await this.getAdminByPhone(updateAdminDto.phone);
      if (adminByPhone && adminByPhone.id != id) {
        throw new BadRequestException('Phone already registered!');
      }
    }

    if (updateAdminDto.username) {
      const adminByUsername = await this.getAdminByUsername(
        updateAdminDto.username,
      );
      if (adminByUsername && adminByUsername.id != id) {
        throw new BadRequestException('Username already registered!');
      }
    }

    if (updateAdminDto.password) {
      const hashed_password = await hash(updateAdminDto.password, 7);
      await this.adminRepository.update({ hashed_password }, { where: { id } });
    }

    await this.adminRepository.update(updateAdminDto, {
      where: { id },
    });
    return this.getOne(id);
  }

  async remove(id: string) {
    await this.getOne(id);
    await this.adminRepository.update({ is_active: false }, { where: { id } });
    return this.getOne(id);
  }

  async getOne(id: string) {
    const admin = await this.adminRepository.findOne({
      where: { id },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'phone',
        'image_name',
        'username',
        'is_active',
      ],
      include: [
        {
          model: Center,
          attributes: ['id', 'name', 'address', 'image_name', 'is_active'],
          include: [
            {
              model: Plan,
              attributes: [
                'id',
                'name',
                'price',
                'student_amount',
                'teacher_amount',
                'group_amount',
                'is_active',
              ],
            },
          ],
        },
      ],
    });
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return admin;
  }

  async getAdminByPhone(phone: string) {
    const admin = await this.adminRepository.findOne({
      where: { phone },
      attributes: ['id', 'phone'],
    });
    return admin;
  }

  async getAdminByUsername(username: string) {
    const admin = await this.adminRepository.findOne({
      where: { username },
      attributes: ['id', 'username', 'hashed_password'],
    });
    return admin;
  }

  async getToken(admin: Admin) {
    try {
      const jwtPayload = {
        id: admin.id,
        username: admin.username,
        role: 'ADMIN',
      };
      const token = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.TOKEN_KEY,
        expiresIn: process.env.TOKEN_TIME,
      });
      return token;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
