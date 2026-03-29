import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { Post } from './entities/post.entity';
import { Image, ImageSchema } from './schemas/image.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Post],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://admin:password@localhost:27017/social_media?authSource=admin'),
    TypeOrmModule.forFeature([Post]),
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
