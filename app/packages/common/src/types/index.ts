// User related types
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
}

// Post related types
export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls?: string[];
  likes: number;
  comments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDto {
  content: string;
  mediaUrls?: string[];
}

export interface UpdatePostDto {
  content?: string;
  mediaUrls?: string[];
}

// Auth related types
export interface JwtPayload {
  userId: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Media related types
export interface MediaFile {
  id: string;
  userId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: Date;
}

export interface UploadMediaDto {
  file: Express.Multer.File;
}

// Feed related types
export interface FeedItem {
  post: Post;
  user: User;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface FeedResponse {
  items: FeedItem[];
  hasMore: boolean;
  nextCursor?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
