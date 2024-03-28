#build

FROM node:20 AS build

WORKDIR /app

COPY . .

# install dependency 

RUN npm -g install @angular/cli
RUN npm i -g angular-http-server
RUN npm install --force

# create a dist folder
RUN npm run build

#deployment
FROM nginx:alpine

COPY --from=build /app/dist/resumebuilder /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx" ,"-g", "daemon off;"]