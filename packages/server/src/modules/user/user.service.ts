import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  createOne(userData: User): Promise<User> {
    return this.userRepository.save(userData);
  }

  async updateOne(id: string, userData: User): Promise<void> {
    await this.userRepository.update(id, userData);
  }

  async replaceOne(id: string, userData: User): Promise<void> {
    await this.userRepository.replaceOne({ _id: new ObjectID(id) }, userData);
  }

  async deleteOne(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
