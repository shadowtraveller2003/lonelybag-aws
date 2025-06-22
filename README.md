
# The Lonely Bag - DevOps Assignment

**Where Food Selects You** - An innovative food waste tracking application built with React, TypeScript, and modern web technologies.

## 🎯 Assignment Overview

This project demonstrates complete DevOps lifecycle including containerization, cloud deployment, and automation on AWS EC2.

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn UI
- **Containerization**: Docker + Nginx
- **Deployment**: AWS EC2 with automation
- **CI/CD**: GitHub integration

## 📋 Assignment Deliverables

### ✅ 1. GitHub Repository Setup
- Repository: `https://github.com/YOUR_USERNAME/the-lonely-bag-app`
- Complete source code with version control
- Comprehensive documentation

### ✅ 2. Dockerization
- **Dockerfile**: Multi-stage build with Node.js and Nginx
- **docker-compose.yml**: Development environment setup
- **nginx.conf**: Production-ready web server configuration

### ✅ 3. AWS EC2 Deployment
- EC2 instance configuration
- Docker deployment on cloud infrastructure
- Public access via EC2 IP address

### ✅ 4. Automation & Bonus Features
- **cloud-init.yml**: Automated EC2 setup on boot
- **deploy.sh**: One-click deployment script
- **IAM roles**: S3 integration capabilities
- Health monitoring and auto-restart

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- AWS Account (free tier eligible)
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/the-lonely-bag-app.git
cd the-lonely-bag-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Access the application**
```
http://localhost:8080
```

## 🐳 Docker Deployment

### Local Docker Setup

1. **Build the Docker image**
```bash
docker build -t the-lonely-bag:latest .
```

2. **Run the container**
```bash
docker run -d --name the-lonely-bag-container -p 3000:80 the-lonely-bag:latest
```

3. **Access the application**
```
http://localhost:3000
```

### Using Docker Compose

1. **Start with Docker Compose**
```bash
docker-compose up -d
```

2. **Stop the application**
```bash
docker-compose down
```

### Docker Commands Reference

```bash
# View running containers
docker ps

# View container logs
docker logs the-lonely-bag-container

# Stop container
docker stop the-lonely-bag-container

# Remove container
docker rm the-lonely-bag-container

# Remove image
docker rmi the-lonely-bag:latest
```

## ☁️ AWS EC2 Deployment

### Step 1: Launch EC2 Instance

1. **Login to AWS Console**
   - Navigate to EC2 Dashboard
   - Click "Launch Instance"

2. **Configure Instance**
   - **Name**: `the-lonely-bag-server`
   - **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
   - **Instance Type**: t2.micro (Free tier eligible)
   - **Key Pair**: Create or select existing key pair
   - **Security Group**: Allow HTTP (80), HTTPS (443), SSH (22)

3. **Advanced Details (Optional - Automated Setup)**
   - Copy contents of `cloud-init.yml` to User Data field
   - This will automatically install Docker and deploy the app

4. **Launch Instance**

### Step 2: Manual Setup (if not using cloud-init)

1. **Connect to EC2 instance**
```bash
ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

2. **Update system**
```bash
sudo apt update && sudo apt upgrade -y
```

3. **Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu
```

4. **Clone and deploy**
```bash
git clone https://github.com/YOUR_USERNAME/the-lonely-bag-app.git
cd the-lonely-bag-app
chmod +x deploy.sh
./deploy.sh
```

### Step 3: Verify Deployment

1. **Check application status**
```bash
docker ps
```

2. **View application logs**
```bash
docker logs the-lonely-bag-container
```

3. **Access the application**
```
http://YOUR_EC2_PUBLIC_IP
```

## 🔧 Automated Deployment Script

The `deploy.sh` script provides one-click deployment:

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

**Script Features:**
- ✅ Automatic Docker installation
- ✅ Container management (stop, remove, rebuild)
- ✅ Health checks
- ✅ Colored output for better visibility
- ✅ Error handling and rollback

## 🔐 IAM Roles and S3 Integration (Bonus)

### Create IAM Role for EC2

1. **Navigate to IAM Console**
   - Create Role → AWS Service → EC2

2. **Attach Policies**
   - `AmazonS3ReadOnlyAccess` (or custom policy)

3. **Attach Role to EC2**
   - EC2 Console → Instance → Actions → Security → Modify IAM Role

### S3 Integration Example

```bash
# Install AWS CLI on EC2
sudo apt install awscli -y

# Test S3 access (no credentials needed with IAM role)
aws s3 ls
aws s3 cp file.txt s3://your-bucket/
```

## 📊 Monitoring and Troubleshooting

### Application Health Check

```bash
# Check if app is responding
curl -f http://localhost:80

# Container resource usage
docker stats the-lonely-bag-container

# System resources
htop
```

### Common Issues and Solutions

1. **Port 80 already in use**
```bash
sudo lsof -i :80
sudo systemctl stop apache2  # if Apache is running
```

2. **Docker permission denied**
```bash
sudo usermod -aG docker $USER
# Log out and log back in
```

3. **Container won't start**
```bash
docker logs the-lonely-bag-container
docker run -it the-lonely-bag:latest sh  # Debug mode
```

## 🔄 CI/CD Pipeline (Advanced)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to EC2

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to EC2
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.EC2_HOST }}
        username: ubuntu
        key: ${{ secrets.EC2_SSH_KEY }}
        script: |
          cd /home/ubuntu/the-lonely-bag-app
          git pull origin main
          ./deploy.sh
```

## 📸 Required Screenshots

For assignment submission, capture:

1. **EC2 Dashboard** showing running instance
2. **SSH Terminal Session** with deployment commands
3. **Application Running** via public EC2 IP
4. **Docker Container Status** (`docker ps` output)
5. **Local Docker Setup** running on development machine

## 🌟 Features Implemented

- **Landing Page**: Modern hero section with call-to-action
- **Dashboard**: Analytics and sustainability metrics
- **Food Tracker**: Inventory management with expiry tracking
- **Community**: User engagement and sharing features
- **Admin Panel**: System management interface
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Dynamic status tracking
- **Toast Notifications**: User feedback system

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Containerization**: Docker with Nginx
- **Cloud Platform**: AWS EC2
- **Version Control**: Git/GitHub

## 📈 Performance Optimizations

- Multi-stage Docker build for minimal image size
- Nginx serving static files with gzip compression
- React component lazy loading
- Optimized bundle splitting
- CDN-ready asset structure

## 🔒 Security Best Practices

- No sensitive data in code
- IAM roles instead of hardcoded credentials
- Security groups with minimal required ports
- Regular dependency updates
- Container running as non-root user

## 📝 Assignment Checklist

- [ ] GitHub repository created and shared
- [ ] Dockerfile implemented and tested
- [ ] Application running locally in Docker
- [ ] EC2 instance launched and configured
- [ ] Application deployed on EC2
- [ ] Screenshots captured and documented
- [ ] README.md with comprehensive instructions
- [ ] Cloud-init automation implemented
- [ ] Deploy script created and tested
- [ ] IAM roles configured for S3 access
- [ ] Documentation uploaded to shared drive

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For issues related to:
- **Application**: Create GitHub issue
- **AWS Deployment**: Check CloudTrail logs
- **Docker**: Review container logs
- **Assignment**: Contact instructor

## 📄 License

This project is created for educational purposes as part of a DevOps internship assignment.

---

**🌱 The Lonely Bag Team**  
*Innovation in Food Tech - Where Food Selects You*
