FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3333

CMD sh -c "pnpm install --frozen-lockfile && pnpm dev"