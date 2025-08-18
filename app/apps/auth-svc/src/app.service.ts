import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🔐 Authentication Service - Running on localhost:3001';
  }
}
