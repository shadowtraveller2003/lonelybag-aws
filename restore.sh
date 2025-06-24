
#!/bin/bash

# restore.sh - Restore script for The Lonely Bag App
# Usage: ./restore.sh [backup-file]

set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[RESTORE]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

BACKUP_DIR="/home/ubuntu/backups"
CONTAINER_NAME="the-lonely-bag-container"

echo "🔄 Starting restore process..."

# Check if backup file is provided
if [ -z "$1" ]; then
    print_error "No backup file specified!"
    print_warning "Available backups:"
    ls -lah $BACKUP_DIR/the-lonely-bag-backup_*.tar.gz 2>/dev/null || echo "No backups found"
    echo ""
    print_warning "Usage: $0 <backup-file>"
    print_warning "Example: $0 the-lonely-bag-backup_20231215_143022.tar.gz"
    exit 1
fi

BACKUP_FILE="$1"
BACKUP_PATH="$BACKUP_DIR/$BACKUP_FILE"

# Check if backup file exists
if [ ! -f "$BACKUP_PATH" ]; then
    print_error "Backup file not found: $BACKUP_PATH"
    exit 1
fi

print_status "Found backup file: $BACKUP_FILE"

# Confirm restore
print_warning "⚠️  This will stop the current application and restore from backup."
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_status "Restore cancelled."
    exit 0
fi

# Stop current container
print_status "Stopping current container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Extract backup
print_status "Extracting backup..."
cd $BACKUP_DIR
tar -xzf "$BACKUP_FILE"

EXTRACTED_DIR=$(basename "$BACKUP_FILE" .tar.gz)

# Restore source code
print_status "Restoring source code..."
rm -rf /home/ubuntu/the-lonely-bag-app
cp -r "$BACKUP_DIR/$EXTRACTED_DIR/the-lonely-bag-app" /home/ubuntu/

# Restore Docker image
print_status "Restoring Docker image..."
docker load -i "$BACKUP_DIR/$EXTRACTED_DIR/the-lonely-bag-image.tar"

# Start restored application
print_status "Starting restored application..."
cd /home/ubuntu/the-lonely-bag-app
docker run -d \
    --name $CONTAINER_NAME \
    -p 80:80 \
    --restart unless-stopped \
    the-lonely-bag:latest

# Wait for application to start
print_status "Waiting for application to start..."
sleep 10

# Verify restoration
if docker ps | grep -q $CONTAINER_NAME; then
    if curl -f http://localhost:80 > /dev/null 2>&1; then
        print_status "✅ Restore completed successfully!"
        print_status "🌐 Application is running at: http://localhost:80"
        print_status "🌐 Public access: http://$(curl -s ifconfig.me)"
    else
        print_error "❌ Application restored but not responding"
        exit 1
    fi
else
    print_error "❌ Container failed to start"
    exit 1
fi

# Display restore information
print_status "📋 Restore Information:"
cat "$BACKUP_DIR/$EXTRACTED_DIR/backup-info.txt"

# Cleanup extracted files
rm -rf "$BACKUP_DIR/$EXTRACTED_DIR"

print_status "🎉 Restore process completed!"

