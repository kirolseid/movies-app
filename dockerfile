FROM node:20

FROM node:20 as development

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm" , "run" , "start-dev" ]



FROM node:20 as test

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "npm" , "run" , "test" ]

FROM node:20 as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 8080
CMD [ "npm" , "start" ]