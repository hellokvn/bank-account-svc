import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column({ name: 'account_holder' })
  public holder: string;

  @Column({ name: 'account_type' })
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
