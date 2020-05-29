FROM node:14.3.0-alpine

WORKDIR /app

COPY package.json ./
COPY admin-buddy-0.1.0.tgz ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]