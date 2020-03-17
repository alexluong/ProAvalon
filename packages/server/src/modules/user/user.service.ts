import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository, ObjectID, FindOneOptions } from "typeorm";
import { User } from "./user.entity";
import { UserCreateBody } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  findOne(
    optionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<User> | Partial<User>,
    maybeOptions?: FindOneOptions<User>,
  ): Promise<User | undefined> {
    return this.userRepository.findOne(optionsOrConditions, maybeOptions);
  }

  async createOne(userData: UserCreateBody): Promise<User> {
    const user = this.userRepository.create(userData);
    if (user.password) {
      await user.hashPassword();
    }
    return this.userRepository.save(user);
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
