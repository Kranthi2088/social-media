import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '📰 Feed Service - Running on localhost:3005';
  }
}
