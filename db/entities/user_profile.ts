import { PrimaryColumn } from "typeorm";
import { Column, Entity } from "typeorm";

@Entity({
  schema: "public",
  name: "user_profile",
})
export class UserProfile {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { name: "first_name" })
  firstName: string;

  @Column("varchar", { name: "last_name" })
  lastName: string;
}
