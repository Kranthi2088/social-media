import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from '../dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Query('userId') userId: string,
  ) {
    return this.postsService.createPost(userId, createPostDto);
  }

  @Get()
  async getAllPosts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.postsService.getAllPosts(page, limit);
  }

  @Get('user/:userId')
  async getUserPosts(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.postsService.getUserPosts(userId, page, limit);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Query('userId') userId: string,
  ) {
    return this.postsService.updatePost(id, userId, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    await this.postsService.deletePost(id, userId);
  }

  @Post(':id/images')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Param('id') postId: string,
    @Query('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageId = await this.postsService.uploadImage(file, postId, userId);
    return { imageId };
  }

  @Get('images/:imageId')
  async getImage(@Param('imageId') imageId: string, @Res() res: Response) {
    const image = await this.postsService.getImage(imageId);
    res.set({
      'Content-Type': image.mimetype,
      'Content-Length': image.size,
    });
    res.send(image.buffer);
  }

  @Post(':id/like')
  async likePost(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.postsService.likePost(id, userId);
  }

  @Post(':id/unlike')
  async unlikePost(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.postsService.unlikePost(id, userId);
  }
}
