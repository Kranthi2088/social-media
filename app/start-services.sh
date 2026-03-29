#!/bin/bash

echo "🚀 Starting Social Media Services..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Navigate to the infra directory
cd infra/docker

# Start all services
echo "📦 Starting containers..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "✅ All services started successfully!"
echo ""
echo "🌐 Services available at:"
echo "   Web App: http://localhost:3000"
echo "   Posts Service: http://localhost:3003"
echo "   Auth Service: http://localhost:3001"
echo "   Users Service: http://localhost:3002"
echo "   Media Service: http://localhost:3004"
echo "   Feed Service: http://localhost:3005"
echo ""
echo "📊 MongoDB: localhost:27017"
echo "🗄️  PostgreSQL: localhost:5432"
echo "🔴 Redis: localhost:6379"
echo ""
echo "🎯 To view the posts interface, visit: http://localhost:3000/posts"
echo ""
echo "🛑 To stop all services, run: docker-compose down"
