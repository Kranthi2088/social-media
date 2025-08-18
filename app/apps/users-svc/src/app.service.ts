import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '👥 Users Service - Running on localhost:3002';
  }
}
