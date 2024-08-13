import {Entity, PrimaryGeneratedColumn , Column, OneToMany} from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    username: string;
    
    @Column()
    email: string;

    @Column()
    password: string;
    
    @OneToMany(() => Wallet, wallet => wallet.user)
    wallets: Wallet[];
}
