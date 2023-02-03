import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CommentEntity {
  constructor() {
    (this.id = 'check'), (this.comment = 'test');
  }
  @Column()
  id: string;
  @Column()
  comment: string;
}
@Entity()
export class Bike {
  @ObjectIdColumn()
  _id: string;
  @Column()
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  createdBy: string;
  @Column()
  typeId: string;
  @Column({ array: true, nullable: true, default: [] })
  likes: string[] | null;
  @Column({ nullable: true, default: [new CommentEntity()] })
  comments: [CommentEntity];
  @Column()
  photo: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date | undefined;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date | undefined;
}
