FROM node:22-alpine AS builder
WORKDIR /app

# Copy lock file first for better layer caching
COPY package.json package-lock.json ./
# Use npm ci directly — lock file should always exist in CI
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

# Run nginx as non-root for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /usr/share/nginx/html /var/cache/nginx \
    && touch /var/run/nginx.pid \
    && chown appuser:appgroup /var/run/nginx.pid

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

USER appuser
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
