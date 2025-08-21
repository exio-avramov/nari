import { PrimaryGeneratedColumn } from "typeorm";
import { Column, Entity } from "typeorm";

@Entity({
  schema: "public",
})
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;
}
