FROM node:6.14.4
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . /usr/src/app/
EXPOSE 3000
CMD [ "npm", "start", "192.168.31.117:3000"]