FROM node:10

LABEL maintainer="Matthew Welte <matthew.welte95@gmail.com>"

# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /app
 
COPY package*.json ./
RUN npm install
COPY . .
