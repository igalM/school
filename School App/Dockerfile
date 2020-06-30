# Create image based on the official Node 10 image from dockerhub
FROM node:10-alpine AS node

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app/

RUN npm run build:prod

FROM nginx:alpine

VOLUME /var/cache/nginx

COPY --from=node /app/dist /usr/share/nginx/html

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf