import { Controller, Get, Post, Put, Delete, Body, Query, Options, Header, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Options('posts')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Access-Control-Allow-Credentials', 'true')
  handleOptions() {
    return {};
  }

  @Get('posts')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Access-Control-Allow-Credentials', 'true')
  async getPosts() {
    return await this.appService.getAllPosts();
  }

  @Post('posts')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Access-Control-Allow-Credentials', 'true')
  async createPost(@Body() createPostDto: any, @Query('userId') userId: string) {
    return await this.appService.createPost(userId, createPostDto.content, createPostDto.imageIds || []);
  }

  @Put('posts/:id')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Access-Control-Allow-Credentials', 'true')
  async updatePost(@Param('id') id: string, @Body() updatePostDto: any, @Query('userId') userId: string) {
    return await this.appService.updatePost(id, userId, updatePostDto.imageIds || []);
  }

  @Options('posts/:id/images')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Access-Control-Allow-Credentials', 'true')
  handleImageOptions() {
    return {};
  }

  @Post('posts/:id/images')
  @UseInterceptors(FileInterceptor('image'))
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Access-Control-Allow-Credentials', 'true')
  async uploadImage(
    @Param('id') postId: string,
    @Query('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageId = await this.appService.uploadImage(file, postId, userId);
    return { imageId };
  }

  @Get('posts/images/:imageId')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Access-Control-Allow-Credentials', 'true')
  async getImage(@Param('imageId') imageId: string, @Res() res: Response) {
    try {
      const image = await this.appService.getImage(imageId);
      res.set({
        'Content-Type': image.mimetype,
        'Content-Length': image.size,
      });
      res.send(image.buffer);
    } catch (error) {
      res.status(404).json({ message: 'Image not found' });
    }
  }

  @Delete('posts/:id')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  @Header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  @Header('Access-Control-Allow-Credentials', 'true')
  async deletePost(@Param('id') id: string, @Query('userId') userId: string) {
    await this.appService.deletePost(id, userId);
    return { message: 'Post deleted successfully' };
  }
}
