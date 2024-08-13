import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { default: 0 })
  balance: number;

  @ManyToOne(() => User, user => user.wallets)
  user: User;
}
