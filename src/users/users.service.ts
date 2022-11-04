import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserDto } from 'src/dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: UserDto): Promise<User> {
    const newUser = this.usersRepository.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.usersRepository.save(newUser);
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  async findByEmail(email: string) {
    const out = await this.usersRepository.findOne({ where: { email } });
    return out;
  }
  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, changes);
    return this.usersRepository.save(user);
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
