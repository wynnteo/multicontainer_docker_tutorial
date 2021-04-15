FROM node:12.13.0-alpine

WORKDIR /usr/src/app/api
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]