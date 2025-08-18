import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '📝 Posts Service - Running on localhost:3003';
  }
}
