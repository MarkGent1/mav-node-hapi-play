# Set default arguments
ARG PORT=3000
ARG PORT_DEBUG=9229

############################
# Development Stage
############################
FROM node:24.2.0-alpine AS development

# Create and set working directory
WORKDIR /home/node/app

# Set environment vars
ARG PORT
ARG PORT_DEBUG
ENV PORT=${PORT}
EXPOSE ${PORT} ${PORT_DEBUG}

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm install

# Copy source
COPY --chown=node:node ./src ./src

# Switch to non-root user
USER node

# Start development server
CMD [ "npm", "run", "docker:dev" ]

############################
# Production Stage
############################
FROM node:24.2.0-alpine AS production

# Set working directory
WORKDIR /home/node/app

# Install curl (optional, for healthchecks or other tools)
USER root
RUN apk add --no-cache curl

# Ensure the directory exists and is owned by 'node'
RUN mkdir -p /home/node/app && chown -R node:node /home/node

# Switch back to non-root user
USER node

# Copy dependencies and source from development build
COPY --from=development /home/node/app/package*.json ./
COPY --from=development /home/node/app/src ./src

# Install production-only dependencies
RUN npm ci --omit=dev

# Set environment and expose port
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

# Start the app
CMD [ "node", "src/index.js" ]
