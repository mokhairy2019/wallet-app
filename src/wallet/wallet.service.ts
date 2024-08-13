import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class WalletService {

  constructor (
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private stripeService: StripeService
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }

  async chargeWallet(user: User, amount: number, source: string) {
    const charge = await this.stripeService.createCharge(amount, source);
    const wallet = await this.walletRepository.findOne({ where: { user } });

    wallet.balance += amount / 100; // Stripe amounts are in cents
    return this.walletRepository.save(wallet);
  }

  async transferFunds(sender: User, receiverId: number, amount: number) {
    const senderWallet = await this.walletRepository.findOne({ where: { user: sender } });
    const receiverWallet = await this.walletRepository.findOne({ where: { user: { id: receiverId } } });

    if (senderWallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await this.walletRepository.save(senderWallet);
    await this.walletRepository.save(receiverWallet);

    return { success: true };
  }
}
