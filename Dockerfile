FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn

ENV NODE_ENV docker

EXPOSE 3000
CMD [ "yarn", "start" ]
