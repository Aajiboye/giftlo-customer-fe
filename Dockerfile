FROM node:20

COPY ./package.json /app/package.json
WORKDIR /app/

RUN npm install --legacy-peer-deps
COPY . /app/
RUN npm run build

ENV PORT 3000
EXPOSE $PORT

CMD ["npm", "start"]
