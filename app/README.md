# Social Media Microservices

A modern, scalable social media application built with microservices architecture using NestJS and Next.js.

## 🏗️ Architecture

```
app/
├─ apps/
│  ├─ web/                     # Next.js frontend
│  ├─ auth-svc/                # Authentication service
│  ├─ users-svc/               # User management service
│  ├─ posts-svc/               # Post management service
│  ├─ media-svc/               # File upload service
│  └─ feed-svc/                # Feed aggregation service
├─ packages/
│  └─ common/                  # Shared types + JWT middleware
├─ infra/
│  └─ docker/
│     ├─ docker-compose.yml    # Local development setup
│     └─ env.example           # Environment variables
└─ .github/workflows/build-push.yml
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (via Docker)
- Redis (via Docker)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-media-microservices
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp infra/docker/env.example infra/docker/.env
   # Edit the .env file with your configuration
   ```

4. **Start the infrastructure services**
   ```bash
   npm run docker:up
   ```

5. **Start all services in development mode**
   ```bash
   npm run dev
   ```

### Service Ports

- **Web Frontend**: http://localhost:3000
- **Auth Service**: http://localhost:3001
- **Users Service**: http://localhost:3002
- **Posts Service**: http://localhost:3003
- **Media Service**: http://localhost:3004
- **Feed Service**: http://localhost:3005
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **MinIO Console**: http://localhost:9001

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev                    # Start all services in dev mode
npm run dev:auth              # Start auth service only
npm run dev:users             # Start users service only
npm run dev:posts             # Start posts service only
npm run dev:media             # Start media service only
npm run dev:feed              # Start feed service only
npm run dev:web               # Start web frontend only

# Building
npm run build                 # Build all services
npm run build:common          # Build common package
npm run build:services        # Build all NestJS services
npm run build:web             # Build Next.js app

# Testing
npm run test                  # Run all tests
npm run test:common           # Test common package
npm run test:services         # Test all services
npm run test:web              # Test web app

# Docker
npm run docker:build          # Build all Docker images
npm run docker:up             # Start all services with Docker
npm run docker:down           # Stop all Docker services
npm run docker:logs           # View Docker logs

# Utilities
npm run clean                 # Clean all build artifacts
npm run install:all           # Install all dependencies
```

### Service Dependencies

Each service has its own dependencies and can be developed independently:

- **auth-svc**: Handles authentication, JWT tokens, user sessions
- **users-svc**: Manages user profiles, settings, and user data
- **posts-svc**: Handles post creation, updates, and deletion
- **media-svc**: Manages file uploads, image processing, and storage
- **feed-svc**: Aggregates posts for user feeds and recommendations
- **web**: Next.js frontend with modern UI/UX

### Common Package

The `packages/common` contains shared utilities:

- **Types**: Shared TypeScript interfaces and DTOs
- **JWT Middleware**: Authentication middleware for NestJS
- **Utilities**: Common helper functions

## 🐳 Docker

### Local Development with Docker

```bash
# Start all services
docker-compose -f infra/docker/docker-compose.yml up -d

# View logs
docker-compose -f infra/docker/docker-compose.yml logs -f

# Stop services
docker-compose -f infra/docker/docker-compose.yml down
```

### Production Deployment

Each service has its own Dockerfile optimized for production:

- Multi-stage builds for smaller images
- Non-root users for security
- Production-optimized dependencies
- Health checks and proper logging

## 🔧 Configuration

### Environment Variables

Key environment variables (see `infra/docker/env.example`):

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/social_media

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Redis
REDIS_URL=redis://localhost:6379

# MinIO/S3
MINIO_ENDPOINT=localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=social-media-files
```

### Service Configuration

Each service can be configured independently:

- **Port**: Each service runs on a different port
- **Database**: Shared PostgreSQL database with service-specific schemas
- **Cache**: Redis for session management and caching
- **Storage**: MinIO for file storage (S3 compatible)

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific service
cd apps/auth-svc && npm test
cd apps/users-svc && npm test
# ... etc
```

### Test Coverage

Each service includes:
- Unit tests
- Integration tests
- E2E tests
- API tests

## 📦 CI/CD

The project includes GitHub Actions workflows for:

- **Build**: Building all services and packages
- **Test**: Running tests across all services
- **Docker**: Building and pushing Docker images
- **Deploy**: Deployment to production (configurable)

## 🏛️ Architecture Patterns

### Microservices Patterns

- **API Gateway**: Next.js handles routing and API calls
- **Service Discovery**: Docker Compose for local development
- **Circuit Breaker**: Implemented in service communication
- **Event Sourcing**: For feed aggregation and notifications
- **CQRS**: Separate read/write models where appropriate

### Data Management

- **Database per Service**: Each service has its own database schema
- **Eventual Consistency**: For cross-service data synchronization
- **Caching Strategy**: Redis for session and data caching
- **File Storage**: MinIO for scalable file storage

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **CORS**: Properly configured for cross-origin requests
- **Input Validation**: Comprehensive validation using DTOs
- **Rate Limiting**: Implemented at the service level
- **HTTPS**: Configured for production deployments

## 📈 Monitoring & Logging

- **Structured Logging**: JSON logs for better parsing
- **Health Checks**: Each service exposes health endpoints
- **Metrics**: Prometheus metrics (configurable)
- **Tracing**: Distributed tracing support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Roadmap

- [ ] Add GraphQL support
- [ ] Implement real-time notifications
- [ ] Add analytics and insights
- [ ] Mobile app support
- [ ] Advanced search functionality
- [ ] Content moderation features
