import { IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BikeType {
  @ObjectIdColumn()
  _id: string;
  @Column()
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  createdBy: string;
  @IsOptional()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @IsOptional()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
