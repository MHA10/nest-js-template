# Stage 1: Base
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Stage 2: Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Stage 3: Development
FROM deps AS development
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "start:dev"]

# Stage 4: Build
FROM deps AS builder
COPY . .
RUN npm run build

# Stage 5: Production Dependencies
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage 6: Production
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user
USER node

# Copy only necessary files
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=prod-deps --chown=node:node /app/package.json ./package.json

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/health || exit 1

EXPOSE ${PORT}

CMD ["node", "dist/main"]
