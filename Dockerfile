FROM node:18

# Create app directory
WORKDIR /backend

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "./bin/www" ]

