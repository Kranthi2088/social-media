# Posts Service

A microservice for handling social media posts with image upload functionality. This service uses PostgreSQL for post metadata and MongoDB for image storage.

## Features

- Create, read, update, and delete posts
- Image upload and storage in MongoDB
- Like/unlike posts
- Pagination support
- User-specific post management

## Architecture

- **PostgreSQL**: Stores post metadata (content, user info, engagement metrics)
- **MongoDB**: Stores image files as binary data
- **NestJS**: Backend framework with TypeORM and Mongoose

## API Endpoints

### Posts

- `POST /posts` - Create a new post
- `GET /posts` - Get all posts (with pagination)
- `GET /posts/user/:userId` - Get posts by user
- `GET /posts/:id` - Get a specific post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Images

- `POST /posts/:id/images` - Upload image for a post
- `GET /posts/images/:imageId` - Get image by ID

### Engagement

- `POST /posts/:id/like` - Like a post
- `POST /posts/:id/unlike` - Unlike a post

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/social_media
MONGODB_URI=mongodb://admin:password@mongodb:27017/social_media?authSource=admin
JWT_SECRET=your-jwt-secret
REDIS_URL=redis://redis:6379
PORT=3003
```

## Database Schema

### PostgreSQL (Posts Table)
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT,
  image_ids TEXT[],
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### MongoDB (Images Collection)
```javascript
{
  filename: String,
  originalName: String,
  mimetype: String,
  size: Number,
  buffer: Buffer,
  postId: String,
  userId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Examples

### Create a Post
```bash
curl -X POST http://localhost:3003/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello World!",
    "imageIds": []
  }' \
  -G -d "userId=user-123"
```

### Upload an Image
```bash
curl -X POST http://localhost:3003/posts/{post-id}/images \
  -F "image=@/path/to/image.jpg" \
  -G -d "userId=user-123"
```

### Get All Posts
```bash
curl http://localhost:3003/posts?page=1&limit=10
```

## Frontend Integration

The web app includes a Twitter-like interface at `/posts` that allows users to:

- Create posts with text and images
- View all posts in a feed
- Like posts
- Delete their own posts
- Upload multiple images per post

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the service:
   ```bash
   npm run start:dev
   ```

3. The service will be available at `http://localhost:3003`

## Docker

The service is configured to run in Docker with the provided docker-compose.yml file. It depends on:

- PostgreSQL database
- MongoDB database
- Redis cache

Run with:
```bash
docker-compose up posts-svc
```
