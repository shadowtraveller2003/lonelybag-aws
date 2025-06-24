
#!/bin/bash

# backup.sh - Backup script for The Lonely Bag App
# Usage: ./backup.sh

set -e

# Configuration
BACKUP_DIR="/home/ubuntu/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="the-lonely-bag-backup_$TIMESTAMP"
CONTAINER_NAME="the-lonely-bag-container"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[BACKUP]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

echo "💾 Starting backup process..."

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

print_status "Creating backup: $BACKUP_NAME"

# Create backup directory for this backup
CURRENT_BACKUP_DIR="$BACKUP_DIR/$BACKUP_NAME"
mkdir -p $CURRENT_BACKUP_DIR

# Backup source code
print_status "Backing up source code..."
cp -r /home/ubuntu/the-lonely-bag-app $CURRENT_BACKUP_DIR/

# Backup Docker image
print_status "Backing up Docker image..."
docker save the-lonely-bag:latest -o $CURRENT_BACKUP_DIR/the-lonely-bag-image.tar

# Backup container logs
print_status "Backing up container logs..."
docker logs $CONTAINER_NAME > $CURRENT_BACKUP_DIR/container.log 2>&1

# Create backup info file
print_status "Creating backup info..."
cat > $CURRENT_BACKUP_DIR/backup-info.txt << EOF
Backup Information
==================
Backup Name: $BACKUP_NAME
Backup Date: $(date)
Container Name: $CONTAINER_NAME
Container Status: $(docker inspect --format='{{.State.Status}}' $CONTAINER_NAME)
Image: the-lonely-bag:latest
Application URL: http://$(curl -s ifconfig.me)

Files Included:
- Source code (the-lonely-bag-app/)
- Docker image (the-lonely-bag-image.tar)
- Container logs (container.log)
- System info (system-info.txt)
EOF

# System information
print_status "Collecting system information..."
cat > $CURRENT_BACKUP_DIR/system-info.txt << EOF
System Information
==================
Date: $(date)
Hostname: $(hostname)
Uptime: $(uptime)
Disk Usage: $(df -h /)
Memory Usage: $(free -h)
Docker Version: $(docker --version)
Docker Images: $(docker images)
Docker Containers: $(docker ps -a)
EOF

# Compress backup
print_status "Compressing backup..."
cd $BACKUP_DIR
tar -czf "$BACKUP_NAME.tar.gz" $BACKUP_NAME
rm -rf $BACKUP_NAME

# Cleanup old backups (keep last 5)
print_status "Cleaning up old backups..."
ls -t the-lonely-bag-backup_*.tar.gz | tail -n +6 | xargs -r rm

print_status "✅ Backup completed successfully!"
print_status "📦 Backup file: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
print_status "📊 Backup size: $(du -h $BACKUP_DIR/$BACKUP_NAME.tar.gz | cut -f1)"

echo ""
print_warning "Available backups:"
ls -lah $BACKUP_DIR/the-lonely-bag-backup_*.tar.gz

