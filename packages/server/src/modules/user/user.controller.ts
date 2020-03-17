import { Controller, Get, Post, Patch, Put, Delete, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createOne(@Body() userData: User): Promise<User> {
    return this.userService.createOne(userData);
  }

  @Get(":id")
  findOne(@Param("id") id): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  updateOne(@Param("id") id, @Body() userData: User): Promise<void> {
    return this.userService.updateOne(id, userData);
  }

  @Put(":id")
  replaceOne(@Param("id") id, @Body() userData: User): Promise<void> {
    return this.userService.replaceOne(id, userData);
  }

  @Delete(":id")
  deleteOne(@Param("id") id): Promise<void> {
    return this.userService.deleteOne(id);
  }
}
