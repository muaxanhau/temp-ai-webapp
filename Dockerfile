FROM node:20 as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20 as runner
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3001
ENTRYPOINT ["npm", "start"]