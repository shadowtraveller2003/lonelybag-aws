
#!/bin/bash

# setup-permissions.sh - Set proper permissions for all scripts
# Usage: ./setup-permissions.sh

echo "🔧 Setting up script permissions..."

# Make all shell scripts executable
chmod +x deploy.sh
chmod +x health-check.sh
chmod +x backup.sh
chmod +x restore.sh
chmod +x setup-permissions.sh

echo "✅ All scripts are now executable!"
echo ""
echo "Available scripts:"
echo "  ./deploy.sh      - Deploy the application"
echo "  ./health-check.sh - Check application health"
echo "  ./backup.sh      - Create backup"
echo "  ./restore.sh     - Restore from backup"

