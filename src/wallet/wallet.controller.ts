import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('charge')
  async chargeWallet(@Req() req, @Body() body) {
    const { amount, source } = body;
    return this.walletService.chargeWallet(req.user, amount, source);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('transfer')
  async transferFunds(@Req() req, @Body() body) {
    const { receiverId, amount } = body;
    return this.walletService.transferFunds(req.user, receiverId, amount);
  }
}
