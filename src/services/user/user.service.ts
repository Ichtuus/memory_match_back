import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: any) {
    const newUser = this.userRepository.create(data);
    await this.userRepository.save(data);
    return newUser;
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne({ where: condition });
  }
}
