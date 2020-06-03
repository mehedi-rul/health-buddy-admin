FROM node:14.3.0-alpine as builder

WORKDIR /home/app

COPY . .

RUN npm install

RUN npm run build

FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /home/app/dist /usr/share/nginx/html/health-buddy-admin
