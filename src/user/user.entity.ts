import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn()
  _id: string;
  @Column()
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  phone: string;
  @Column({ select: false })
  password: string;
  @Column({ nullable: true })
  photo: string;
  @IsOptional()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date | undefined;
  @IsOptional()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date | undefined;
}
