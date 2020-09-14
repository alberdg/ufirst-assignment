FROM node:alpine

# Set working directory
WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

RUN mkdir client

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./client/package*.json ./client/

RUN cd client

RUN npm install --production

# Copy all files
COPY ./client ./client/


RUN cd /usr/app

RUN mkdir backend

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./backend/package*.json ./backend/

RUN cd backend

RUN npm install --production

# Copy all files
COPY ./backend ./backend/

# Launch app
CMD [ "npm", "start" ]
