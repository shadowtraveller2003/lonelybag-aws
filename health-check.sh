
#!/bin/bash

# health-check.sh - Simple health monitoring for The Lonely Bag App
# Usage: ./health-check.sh

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

CONTAINER_NAME="the-lonely-bag-container"
APP_URL="http://localhost:80"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[HEALTH CHECK]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

echo "🏥 Starting health check for The Lonely Bag App..."

# Check if container is running
if docker ps | grep -q $CONTAINER_NAME; then
    print_status "✅ Container is running"
    
    # Check container health
    CONTAINER_STATUS=$(docker inspect --format='{{.State.Status}}' $CONTAINER_NAME)
    if [ "$CONTAINER_STATUS" = "running" ]; then
        print_status "✅ Container status: $CONTAINER_STATUS"
    else
        print_error "❌ Container status: $CONTAINER_STATUS"
        exit 1
    fi
    
    # Check application response
    if curl -f -s $APP_URL > /dev/null; then
        print_status "✅ Application is responding"
        
        # Get response time
        RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' $APP_URL)
        print_status "📊 Response time: ${RESPONSE_TIME}s"
        
    else
        print_error "❌ Application is not responding"
        print_warning "🔄 Attempting to restart container..."
        
        docker restart $CONTAINER_NAME
        
        # Wait for restart
        sleep 10
        
        # Test again
        if curl -f -s $APP_URL > /dev/null; then
            print_status "✅ Application recovered after restart"
        else
            print_error "❌ Application still not responding after restart"
            exit 1
        fi
    fi
    
else
    print_error "❌ Container is not running"
    print_warning "🚀 Attempting to start container..."
    
    # Try to start the container
    if docker start $CONTAINER_NAME; then
        print_status "✅ Container started successfully"
        sleep 5
        
        # Test application
        if curl -f -s $APP_URL > /dev/null; then
            print_status "✅ Application is now responding"
        else
            print_error "❌ Application failed to start properly"
            exit 1
        fi
    else
        print_error "❌ Failed to start container"
        exit 1
    fi
fi

# Display container stats
print_status "📊 Container Statistics:"
docker stats --no-stream $CONTAINER_NAME

# Display recent logs
print_status "📝 Recent Container Logs:"
docker logs --tail 10 $CONTAINER_NAME

print_status "🎉 Health check completed successfully!"
echo ""
print_status "🌐 Application accessible at: $APP_URL"
print_status "🌐 Public access: http://$(curl -s ifconfig.me)"

