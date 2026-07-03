# syntax=docker/dockerfile:1
FROM node:26-slim AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g corepack@latest && \
    corepack enable && \
    pnpm --version

WORKDIR /app
COPY . .

RUN pnpm install --frozen-lockfile && pnpm run build

FROM nginxinc/nginx-unprivileged:alpine

USER root
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
USER 101

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
