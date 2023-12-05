# Using Official Node.js image
FROM node:alpine

# Setting the working directory in the container
WORKDIR /app

# Copying necessary files to the working directory
COPY package.json .
COPY yarn.lock .

# Installing the dependencies
RUN yarn install --production=false

# Copying the rest of the files
COPY . .

# Building the project
RUN yarn build

# Expose the port on which the Next.js application will run
EXPOSE 3000

# Command to start Next.js server
CMD ["yarn", "start"]
