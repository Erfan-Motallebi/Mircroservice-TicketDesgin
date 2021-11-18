FROM node:alpine

WORKDIR /app

COPY package.json ./

# To remove the devDependencies from being pulled to the Kubernetes Cluster
RUN npm install --only=production

# RUN npm install

COPY ./ ./

CMD [ "npm", "run", "start" ]