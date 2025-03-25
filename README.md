# Isonga App: Citizen's Complaints Resolution for Rwanda

## Project Overview
The Isonga App is a comprehensive web application designed to streamline the process of reporting and resolving citizen complaints in Rwanda. Built with modern technologies and following microservices architecture, it provides an efficient platform for complaint management and resolution tracking.

## Features
- **User Authentication**: Secure login and registration system
- **Complaint Management**: Submit, track, and manage complaints
- **Real-time Notifications**: Automated updates on complaint status
- **Analytics Dashboard**: Track complaint patterns and resolution metrics
- **Multi-language Support**: Available in English and Kinyarwanda

## Architecture
- **Backend API**: Core service handling user authentication and complaint management
- **Analytics Service**: Microservice for processing complaint data and generating insights
- **Notification Service**: Handles email and SMS notifications
- **Database**: MongoDB for persistent data storage

## Technologies Used
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Microservices**: Node.js
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions, Jenkins

## Prerequisites
- Node.js (v16 or later)
- Docker and Docker Desktop
- MongoDB
- Kubernetes CLI (kubectl)
- Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Gastongthub/23RP01808-Isonga-App-Citizens-complaints
   cd Isonga_App
   ```

2. Install dependencies for all services:
   ```bash
   # Main backend
   cd backend
   npm install

   # Analytics service
   cd ../analytics-service
   npm install

   # Microservice
   cd ../microservice
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in each service directory
   - Update the variables with your configuration

4. Run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

## Development

### Local Development
1. Start MongoDB locally or use a cloud instance
2. Run each service individually:
   ```bash
   # Backend API
   cd backend
   npm start

   # Analytics Service
   cd analytics-service
   npm start

   # Microservice
   cd microservice
   npm start
   ```

### Docker Development
```bash
# Build and run all services
docker-compose up --build

# Run specific service
docker-compose up backend
```

## Deployment

### Kubernetes Deployment
1. Apply Kubernetes configurations:
   ```bash
   kubectl apply -f k8s/
   ```

2. Verify deployments:
   ```bash
   kubectl get pods
   kubectl get services
   ```

### CI/CD Pipeline
- GitHub Actions workflow automatically builds and tests on push
- Jenkins pipeline handles deployment to staging/production
- Automated Docker image builds and pushes to registry

## API Documentation
- Backend API: http://localhost:3000/api/docs
- Analytics Service: http://localhost:3001/api/docs

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Gaston - [GitHub](https://github.com/Gastongthub)