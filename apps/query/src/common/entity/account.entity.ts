import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

import { AccountType } from '@shared/enums';

@Entity()
export class Account {
  @PrimaryColumn('uuid')
  public id: string;

  @Column()
  public holder: string;

  @Column()
  public email: string;

  @Column({ type: 'enum', enum: AccountType })
  public type: AccountType;

  @Column({ name: 'is_active', default: true })
  public isActive: boolean;

  @CreateDateColumn({ name: 'created_date' })
  public createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  public updatedDate: Date;
}
