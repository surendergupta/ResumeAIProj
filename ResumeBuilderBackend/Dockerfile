# Select Base Image
FROM node:18

#Set up the working directory
WORKDIR /app

# Copy all of the files
COPY . .

# Install dependencies
RUN npm install
RUN npm install -g typescript

# build dist
RUN tsc --build


# Expose port to connect to the container
EXPOSE 3000

# Run the node command to start backend
CMD [ "npm","run", "start" ]