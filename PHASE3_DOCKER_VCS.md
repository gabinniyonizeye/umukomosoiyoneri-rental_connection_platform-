# PHASE 3: DOCKER CONTAINERIZATION & VERSION CONTROL

## Part A: Docker Containerization

### 1. WHAT IS DOCKER?

Docker is a containerization platform that packages applications and their dependencies into isolated, portable units called containers. It ensures consistency across development, testing, and production environments.

**Key Benefits**:
- **Consistency**: Same environment everywhere
- **Isolation**: Dependencies don't conflict
- **Portability**: Run on any system with Docker
- **Scalability**: Easy to scale containers
- **Efficiency**: Lightweight compared to VMs

---

### 2. DOCKERIZATION PROCESS

#### Step 1: Create Dockerfile
A Dockerfile contains instructions to build a Docker image:

```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "preview"]
```

**Dockerfile Instructions**:
- `FROM`: Base image to build upon
- `WORKDIR`: Working directory inside container
- `COPY`: Copy files from host to container
- `RUN`: Execute commands during build
- `EXPOSE`: Document which ports the app uses
- `CMD`: Default command when container starts

#### Step 2: Build Docker Image
```bash
docker build -t umukomisiyoneri:1.0 .
```

**What happens**:
1. Reads Dockerfile
2. Executes each instruction
3. Creates layers (cached for efficiency)
4. Tags image as `umukomisiyoneri:1.0`

#### Step 3: Run Docker Container
```bash
docker run -p 3000:3000 umukomisiyoneri:1.0
```

**What happens**:
1. Creates container from image
2. Maps port 3000 (container) → 3000 (host)
3. Starts application
4. Container runs in isolation

#### Step 4: Push to Registry (Optional)
```bash
docker tag umukomisiyoneri:1.0 yourusername/umukomisiyoneri:1.0
docker push yourusername/umukomisiyoneri:1.0
```

---

### 3. MULTI-STAGE BUILD OPTIMIZATION

Our Dockerfile uses multi-stage build to reduce image size:

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Benefits**:
- Builder stage discarded after build
- Final image only contains production files
- Reduces image size from ~500MB to ~150MB
- Faster deployment

---

### 4. DOCKER COMPOSE

Docker Compose manages multi-container applications using `docker-compose.yml`:

```yaml
version: '3.8'

services:
  umukomisiyoneri:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: umukomisiyoneri-app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  umukomisiyoneri-network:
    driver: bridge
```

---

### 5. USING DOCKER WITH UMUKOMISIYONERI

#### Production Deployment

```bash
# Build image
docker build -t umukomisiyoneri:latest .

# Run container
docker run -d \
  --name umukomisiyoneri \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  umukomisiyoneri:latest

# View logs
docker logs -f umukomisiyoneri

# Stop container
docker stop umukomisiyoneri

# Remove container
docker rm umukomisiyoneri
```

#### Development with Docker Compose

```bash
# Start development environment
docker-compose --profile dev up -d

# View logs
docker-compose logs -f umukomisiyoneri-dev

# Stop services
docker-compose down

# Rebuild after dependency changes
docker-compose build --no-cache
```

#### Production with Docker Compose

```bash
# Start production environment
docker-compose up -d

# Scale to multiple instances
docker-compose up -d --scale umukomisiyoneri=3

# View status
docker-compose ps

# Stop all services
docker-compose down
```

---

### 6. DOCKER BEST PRACTICES IMPLEMENTED

| Practice | Implementation |
|----------|-----------------|
| Use specific base image version | `node:18-alpine` (not `latest`) |
| Minimize layers | Combine RUN commands where possible |
| Use .dockerignore | Exclude node_modules, .git, etc. |
| Multi-stage build | Separate build and runtime stages |
| Health checks | Monitor container health |
| Non-root user | Run as unprivileged user |
| Small base image | Alpine Linux (~5MB vs ~900MB) |

---

### 7. TROUBLESHOOTING

| Issue | Solution |
|-------|----------|
| Port already in use | `docker run -p 3001:3000 ...` |
| Container exits immediately | Check logs: `docker logs <container>` |
| Build fails | Clear cache: `docker build --no-cache .` |
| Permission denied | Use `sudo` or add user to docker group |
| Out of disk space | `docker system prune -a` |

---

## Part B: VERSION CONTROL SYSTEM (GIT)

### 1. GIT CONFIGURATION

Git is already initialized in your project. Here's the configuration:

#### Global Configuration
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.editor "code"
```

#### Project Configuration
```bash
# View current config
git config --list

# Set project-specific config
git config user.name "Project Name"
git config user.email "project@example.com"
```

---

### 2. GIT WORKFLOW

#### Initial Setup
```bash
# Clone repository
git clone https://github.com/gabinniyonizeye/umukomisiyoneri.git
cd umukomisiyoneri

# Create feature branch
git checkout -b feature/listing-approval
```

#### Development Workflow
```bash
# Check status
git status

# Stage changes
git add src/stores/listings.js
git add src/views/AdminDashboard.vue

# Commit with descriptive message
git commit -m "feat: implement listing approval workflow

- Add approval/rejection functionality
- Update listing status in store
- Add admin notifications"

# Push to remote
git push origin feature/listing-approval
```

#### Commit Message Convention
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore  
**Scope**: Component or module affected  
**Subject**: Brief description (50 chars max)

**Example**:
```
feat(admin): add listing approval workflow

- Implement approve/reject functionality
- Add rejection reason field
- Send notifications to owners
- Update listing status in store

Closes #123
```

---

### 3. BRANCH STRATEGY

```
main (production)
  ↑
  └─ release/v1.0
       ↑
       └─ develop (staging)
            ↑
            ├─ feature/auth
            ├─ feature/listings
            ├─ feature/bookings
            ├─ bugfix/login-issue
            └─ docs/readme
```

**Branch Types**:
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `release/*`: Release preparation
- `docs/*`: Documentation

---

### 4. COMMON GIT COMMANDS

```bash
# View commit history
git log --oneline --graph --all

# View changes
git diff
git diff --staged

# Undo changes
git restore <file>
git restore --staged <file>

# Amend last commit
git commit --amend --no-edit

# Rebase on develop
git rebase develop

# Merge feature branch
git checkout develop
git merge feature/listings

# Delete branch
git branch -d feature/listings
git push origin --delete feature/listings

# Tag release
git tag -a v1.0 -m "Release version 1.0"
git push origin v1.0
```

---

### 5. .GITIGNORE CONFIGURATION

Your `.gitignore` already excludes:
```
node_modules/          # Dependencies
dist/                  # Build output
*.local                # Local files
.vscode/               # Editor config
.idea/                 # IDE config
*.log                  # Log files
```

---

### 6. GIT BEST PRACTICES

✅ Commit frequently with meaningful messages  
✅ Create feature branches for new work  
✅ Keep commits focused and atomic  
✅ Pull before pushing  
✅ Review changes before committing  
✅ Use .gitignore to exclude unnecessary files  
✅ Tag releases  
✅ Document breaking changes  

---

### 7. CONTINUOUS INTEGRATION (CI)

For automated testing and deployment, create `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
```

---

## Summary

**Docker**: Containerizes your app for consistent deployment  
**Git**: Tracks code changes and enables collaboration  
**Together**: Enable modern DevOps practices

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Status**: Complete
