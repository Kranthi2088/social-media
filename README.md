# Social Media Platform

A modern, microservices-based social media platform built with NestJS, Next.js, PostgreSQL, and MongoDB.

## 🚀 Features

- **Posts Service**: Create, read, update, and delete posts with image upload
- **Image Storage**: MongoDB-based image storage with binary data
- **User Management**: Authentication and user profiles
- **Real-time Feed**: Dynamic post feed with engagement features
- **Modern UI**: Twitter-like interface built with Next.js and Tailwind CSS
- **Microservices Architecture**: Scalable, independent services

## 🏗️ Architecture

### Services
- **Web App** (Next.js): Frontend interface at `http://localhost:3000`
- **Posts Service** (NestJS): Post management at `http://localhost:3003`
- **Auth Service** (NestJS): Authentication at `http://localhost:3001`
- **Users Service** (NestJS): User management at `http://localhost:3002`
- **Media Service** (NestJS): Media handling at `http://localhost:3004`
- **Feed Service** (NestJS): Feed aggregation at `http://localhost:3005`

### Databases
- **PostgreSQL**: Post metadata, user data, and relationships
- **MongoDB**: Image storage and binary data
- **Redis**: Caching and sessions

## 🎯 Posts Service Features

### Image Upload
- Upload multiple images per post
- Image validation (type and size)
- MongoDB storage for binary data
- Automatic image serving

### Post Management
- Create posts with text and images
- Like/unlike posts
- Delete posts (soft delete)
- Pagination support
- User-specific post filtering

### API Endpoints
```
POST   /posts                    # Create post
GET    /posts                    # Get all posts
GET    /posts/user/:userId       # Get user posts
GET    /posts/:id                # Get specific post
PUT    /posts/:id                # Update post
DELETE /posts/:id                # Delete post
POST   /posts/:id/images         # Upload image
GET    /posts/images/:imageId    # Get image
POST   /posts/:id/like           # Like post
POST   /posts/:id/unlike         # Unlike post
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### 1. Start All Services
```bash
# From the project root
./app/start-services.sh
```

Or manually:
```bash
cd app/infra/docker
docker-compose up -d
```

### 2. Access the Application
- **Main App**: http://localhost:3000
- **Posts Interface**: http://localhost:3000/posts
- **Dashboard**: http://localhost:3000/dashboard
- **Service Status**: http://localhost:3000/status

### 3. Test the Posts Service
```bash
cd app/apps/posts-svc
npm install
node test-posts.js
```

## 📱 Twitter-like Interface

The web app includes a modern, responsive interface similar to Twitter:

### Features
- **Post Creation**: Text input with image upload
- **Image Preview**: Real-time preview of selected images
- **Feed Display**: Chronological post feed
- **Engagement**: Like posts with real-time counter updates
- **Responsive Design**: Works on desktop and mobile
- **Modern UI**: Clean, intuitive interface

### Usage
1. Navigate to http://localhost:3000/posts
2. Type your post content (optional)
3. Click the image icon to upload photos
4. Click "Post" to publish
5. Like posts by clicking the heart icon
6. Delete your own posts with the trash icon

## 🛠️ Development

### Local Development Setup
```bash
# Install dependencies for each service
cd app/apps/posts-svc && npm install
cd app/apps/web && npm install
cd app/apps/auth-svc && npm install
# ... repeat for other services

# Start individual services
cd app/apps/posts-svc && npm run start:dev
cd app/apps/web && npm run dev
```

### Environment Variables
Create `.env` files in each service directory:

```env
# Posts Service
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/social_media
MONGODB_URI=mongodb://admin:password@localhost:27017/social_media?authSource=admin
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
PORT=3003
```

### Database Schema

#### PostgreSQL (Posts Table)
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

#### MongoDB (Images Collection)
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

## 🧪 Testing

### API Testing
```bash
# Test posts service
curl -X POST http://localhost:3003/posts \
  -H "Content-Type: application/json" \
  -d '{"content": "Hello World!", "imageIds": []}' \
  -G -d "userId=test-user"
```

### Frontend Testing
1. Open http://localhost:3000/posts
2. Create a post with text
3. Upload an image
4. Like the post
5. Delete the post

## 📊 Monitoring

### Service Status
- Visit http://localhost:3000/status to see all service statuses
- Check individual service health endpoints

### Logs
```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f posts-svc
```

## 🔧 Configuration

### Docker Compose
The `docker-compose.yml` file configures:
- PostgreSQL database
- MongoDB database
- Redis cache
- All microservices
- Web frontend

### Service Configuration
Each service can be configured independently through environment variables and configuration files.

## 🚀 Deployment

### Production Deployment
1. Set up production environment variables
2. Configure production databases
3. Build Docker images
4. Deploy with Docker Compose or Kubernetes

### Environment Variables
```env
NODE_ENV=production
DATABASE_URL=your-production-db-url
MONGODB_URI=your-production-mongodb-url
JWT_SECRET=your-production-secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the service documentation in each service directory
- Review the API endpoints
- Check the service status page
- Open an issue on GitHub

---

**Happy posting! 🎉**
