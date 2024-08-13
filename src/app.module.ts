import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { StripeService } from './stripe/stripe.service';
import { User } from './user/entities/user.entity';
import { Wallet } from './wallet/entities/wallet.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'wallet-app',
      entities: [User, Wallet],
      synchronize: true,
    }),
    UserModule, 
    WalletModule]
})
export class AppModule {}
