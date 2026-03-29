import { IsString, IsOptional, IsArray, IsUUID, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsOptional()
  @MaxLength(280)
  content?: string;

  @IsArray()
  @IsOptional()
  imageIds?: string[];
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @MaxLength(280)
  content?: string;

  @IsArray()
  @IsOptional()
  imageIds?: string[];
}

export class PostResponseDto {
  id: string;
  userId: string;
  content?: string;
  imageIds?: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  createdAt: Date;
  updatedAt: Date;
}
