import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'));
  }

  async createCharge(amount: number, source: string): Promise<Stripe.Charge> {
    return this.stripe.charges.create({
      amount,
      currency: 'usd',
      source,
    });
  }
}
