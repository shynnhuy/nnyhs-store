import { Injectable } from '@nestjs/common';
import { createPaymentUrl } from 'src/lib/momo';

@Injectable()
export class PaymentService {
  async createPayment() {
    const response = await createPaymentUrl();
    return { result: response };
  }
}
