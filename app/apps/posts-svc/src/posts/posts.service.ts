import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../entities/post.entity';
import { Image, ImageDocument } from '../schemas/image.schema';
import { CreatePostDto, UpdatePostDto, PostResponseDto } from '../dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectModel(Image.name)
    private imageModel: Model<ImageDocument>,
  ) {}

  async createPost(userId: string, createPostDto: CreatePostDto): Promise<PostResponseDto> {
    const post = this.postRepository.create({
      userId,
      content: createPostDto.content,
      imageIds: createPostDto.imageIds || [],
    });

    const savedPost = await this.postRepository.save(post);
    return this.mapToResponseDto(savedPost);
  }

  async getPost(id: string): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({ where: { id, isDeleted: false } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return this.mapToResponseDto(post);
  }

  async getUserPosts(userId: string, page: number = 1, limit: number = 10): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({
      where: { userId, isDeleted: false },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return posts.map(post => this.mapToResponseDto(post));
  }

  async getAllPosts(page: number = 1, limit: number = 10): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return posts.map(post => this.mapToResponseDto(post));
  }

  async updatePost(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({ where: { id, userId, isDeleted: false } });
    if (!post) {
      throw new NotFoundException('Post not found or you do not have permission to update it');
    }

    Object.assign(post, updatePostDto);
    const updatedPost = await this.postRepository.save(post);
    return this.mapToResponseDto(updatedPost);
  }

  async deletePost(id: string, userId: string): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id, userId, isDeleted: false } });
    if (!post) {
      throw new NotFoundException('Post not found or you do not have permission to delete it');
    }

    post.isDeleted = true;
    await this.postRepository.save(post);

    // Delete associated images from MongoDB
    await this.imageModel.deleteMany({ postId: id });
  }

  async uploadImage(file: Express.Multer.File, postId: string, userId: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validate file type
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('File size too large. Maximum size is 5MB');
    }

    const image = new this.imageModel({
      filename: file.filename,
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
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  async likePost(id: string, userId: string): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({ where: { id, isDeleted: false } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.likesCount += 1;
    const updatedPost = await this.postRepository.save(post);
    return this.mapToResponseDto(updatedPost);
  }

  async unlikePost(id: string, userId: string): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({ where: { id, isDeleted: false } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.likesCount > 0) {
      post.likesCount -= 1;
    }
    const updatedPost = await this.postRepository.save(post);
    return this.mapToResponseDto(updatedPost);
  }

  private mapToResponseDto(post: Post): PostResponseDto {
    return {
      id: post.id,
      userId: post.userId,
      content: post.content,
      imageIds: post.imageIds,
      likesCount: post.likesCount,
      commentsCount: post.commentsCount,
      sharesCount: post.sharesCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}
