# Full-Stack Application Overview

## About the Application
    This project is a full-stack solution designed with NestJS for the backend, React for the frontend, and MongoDB for the database. The application is fully containerized using Docker, allowing for seamless deployment and execution with a single command.

### Technology Stack
#### Backend: Built with NestJS, handling phishing simulation and attempt tracking.
####   Frontend: Developed using React for user interfaces and interaction.
####  Database: MongoDB serves as the data storage for user information and phishing records.
####   Containerization: Docker ensures portability and easy environment setup.



## 1. Clone the Repository
Start by cloning the repository and navigating to the project directory:

git clone <repository_url>
cd phishing

## 2. Set Up Environment Variables
Copy the example environment variable files and rename them to .env in the respective directories:


Backend:
    cd server
    cp .env.local .env


Frontend:


    cd client
    cp .env.local .env

## 3. Launch the Application
Run the entire stack using Docker Compose:

    docker compose up -d

## 4. Access the Application
After starting, the application will be available on these endpoints:

Backend: http://localhost:8080
Frontend: http://localhost:3000

MongoDB: Connect via localhost:27017

How to Stop the Application

To stop and clean up the application, run:

    docker-compose down

### Important Notes

 Ensure .env files are properly configured in both backend/ and frontend/ directories before starting the application.
Troubleshooting Tips
Docker-Related Issues:

Ensure Docker and Docker Compose are properly installed on your system.
Check Docker service status if containers fail to start.
Port Conflicts:

Verify that the default ports (3000, 8080, and 27017) are not already in use by other applications on your system.

With this setup, you’re ready to run and explore the full-stack phishing simulation application. 🚀






