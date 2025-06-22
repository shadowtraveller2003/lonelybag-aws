
#!/bin/bash

# deploy.sh - Automated deployment script for The Lonely Bag App
# Usage: ./deploy.sh

set -e  # Exit on any error

echo "🚀 Starting deployment of The Lonely Bag App..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="the-lonely-bag"
DOCKER_IMAGE="$APP_NAME:latest"
CONTAINER_NAME="$APP_NAME-container"
PORT=80

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Installing Docker..."
    
    # Update package index
    sudo apt-get update
    
    # Install prerequisites
    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
    
    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Set up stable repository
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker Engine
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    
    # Add current user to docker group
    sudo usermod -aG docker $USER
    
    print_status "Docker installed successfully. Please log out and log back in, then run this script again."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    print_error "Docker is not running. Starting Docker..."
    sudo systemctl start docker
    sudo systemctl enable docker
    
    # Wait a moment for Docker to start
    sleep 3
fi

print_status "Stopping existing container (if any)..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

print_status "Building Docker image..."
docker build -t $DOCKER_IMAGE .

print_status "Running the application..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    --restart unless-stopped \
    $DOCKER_IMAGE

# Wait a moment for container to start
sleep 5

# Check if container is running
if docker ps | grep -q $CONTAINER_NAME; then
    print_status "✅ Application deployed successfully!"
    print_status "🌐 Access the app at: http://localhost:$PORT"
    print_status "🌐 Or via IP: http://$(hostname -I | awk '{print $1}'):$PORT"
    print_status "🐳 Container logs: docker logs $CONTAINER_NAME"
else
    print_error "❌ Deployment failed. Check Docker logs:"
    docker logs $CONTAINER_NAME
    exit 1
fi

echo ""
print_status "📊 Container Status:"
docker ps | grep $CONTAINER_NAME

echo ""
print_status "🔧 Useful commands:"
echo "  - View logs: docker logs -f $CONTAINER_NAME"
echo "  - Stop app: docker stop $CONTAINER_NAME"
echo "  - Restart app: docker restart $CONTAINER_NAME"
echo "  - Remove app: docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME"
