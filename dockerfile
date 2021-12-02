# Multi stage


# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage 'builder'
FROM node:14-alpine3.12 as builder

# versions
RUN npm -v
RUN node -v

# set working directory
WORKDIR /app

# Copy package json and install packages
COPY package.json ./
RUN npm install

# Copy other project files and build
COPY . ./
RUN npm run build

# Stage 2
FROM nginx:1.12-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf


# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Static build
COPY --from=builder /app/build .

EXPOSE 80

RUN ls -l
CMD [ "nginx", "-g", "daemon off;" ]