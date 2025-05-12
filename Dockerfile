FROM node:22 AS base

WORKDIR /home/node/app

COPY package*.json ./

# Install pnpm
RUN npm install -g pnpm

# Clean and install dependencies with pnpm
RUN pnpm store prune
RUN rm -rf node_modules
RUN pnpm install

COPY . .


FROM base AS production

RUN pnpm run build


FROM base AS unit-tests

ENV GIT_WORK_TREE=/home/node/app GIT_DIR=/home/node/.git

RUN apt-get update && \
    apt-get install git