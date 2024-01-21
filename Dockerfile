FROM node:alpine3.18
LABEL authors="titanabrian"

WORKDIR /app
COPY ./package*.json ./
COPY ./dist ./dist

ENV NODE_PATH ./dist
ENV PORT 80

RUN npm i

CMD ["node", "./dist/src/app.js"]
EXPOSE 80
