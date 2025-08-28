FROM node:20.11-alpine3.19 as builder

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm ci

COPY ./frontend .

RUN npm run build
FROM nginx:alpine as production

COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5432

CMD ["nginx", "-g", "daemon off;"]