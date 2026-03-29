import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectModel(Image.name)
    private imageModel: Model<ImageDocument>,
  ) {}

  getHello(): string {
    return '📝 Posts Service - Running on localhost:3003';
  }

  async createPost(userId: string, content?: string, imageIds: string[] = []): Promise<Post> {
    const post = this.postRepository.create({
      userId,
      content,
      imageIds,
    });
    return await this.postRepository.save(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
    });
  }

  async updatePost(id: string, userId: string, imageIds: string[]): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id, userId, isDeleted: false } });
    if (!post) {
      throw new Error('Post not found or you do not have permission to update it');
    }
    
    post.imageIds = imageIds;
    return await this.postRepository.save(post);
  }

  async deletePost(id: string, userId: string): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id, userId, isDeleted: false } });
    if (!post) {
      throw new Error('Post not found or you do not have permission to delete it');
    }
    
    post.isDeleted = true;
    await this.postRepository.save(post);
    
    // Delete associated images from MongoDB
    await this.imageModel.deleteMany({ postId: id });
  }

  async uploadImage(file: Express.Multer.File, postId: string, userId: string): Promise<string> {
    if (!file) {
      throw new Error('No file uploaded');
    }

    // Validate file type
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size too large. Maximum size is 5MB');
    }

    const image = new this.imageModel({
      filename: file.filename || `image_${Date.now()}`,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
      postId,
      userId,
    });

    const savedImage = await image.save();
    return (savedImage._id as any).toString();
  }

  async getImage(imageId: string): Promise<ImageDocument> {
    const image = await this.imageModel.findById(imageId);
    if (!image) {
      throw new Error('Image not found');
    }
    return image;
  }
}
