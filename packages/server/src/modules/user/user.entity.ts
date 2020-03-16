import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity({ name: "users" })
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;
}
