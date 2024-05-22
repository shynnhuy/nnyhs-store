import axios, { AxiosRequestConfig } from 'axios';
import * as crypto from 'crypto';

const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
const orderInfo = 'pay with MoMo';
const partnerCode = 'MOMO';
const redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
const ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
const requestType = 'payWithMethod';
const amount = '50000';
const orderId = partnerCode + new Date().getTime();
const requestId = orderId;
const extraData = '';
const orderGroupId = '';
const autoCapture = true;

const hashSignature = (rawSignature: string) =>
  crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

export const createPaymentUrl = async () => {
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = hashSignature(rawSignature);

  const body = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: 'vi',
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
    items: [
      {
        id: '204727',
        name: 'YOMOST Bac Ha&Viet Quat 170ml',
        description: 'YOMOST Sua Chua Uong Bac Ha&Viet Quat 170ml/1 Hop',
        category: 'beverage',
        imageUrl: 'https://momo.vn/uploads/product1.jpg',
        manufacturer: 'Vinamilk',
        price: 10000,
        quantity: 5,
        unit: 'hộp',
        totalPrice: 50000,
        taxAmount: '200',
      },
    ],
  });

  const options: AxiosRequestConfig<any> = {
    url: 'https://test-payment.momo.vn/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
    data: body,
  };

  try {
    const resp = await axios(options);

    return resp.data;
  } catch (error) {
    throw error;
  }
};
