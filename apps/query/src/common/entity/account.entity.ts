import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public holder: string;

  @Column()
  public email: string;

  @Column()
  public type: string;

  @Column()
  public balance: number;

  @Column({ name: 'is_active', default: true })
  public isActive: boolean;

  @CreateDateColumn({ name: 'created_date' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  public updatedDate: Date;
}
