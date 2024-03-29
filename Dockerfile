FROM node:16.17.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 1234
CMD [ "nodemon", "server.js" ]



# run command for node server
# docker build --tag node-project .
# node-project is name of image whatever want just give
# docker run node-project