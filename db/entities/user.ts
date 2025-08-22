import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { UserProfile } from "./user_profile.ts";

@Entity({
  schema: "auth",
  name: "users",
  synchronize: false,
})
export class User {
  @PrimaryColumn({
    name: "id",
    nullable: false,
  })
  id: string;

  @Column({
    name: "email",
    nullable: true,
  })
  email: string;

  @Column({
    name: "phone",
    nullable: true,
  })
  phone: string;

  @OneToOne(() => UserProfile)
  @JoinColumn({})
  @JoinColumn({ name: "id" })
  profile: UserProfile;
}
