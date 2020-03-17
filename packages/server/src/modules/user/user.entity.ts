import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity({ name: "users" })
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
