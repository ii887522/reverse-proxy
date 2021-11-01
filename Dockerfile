FROM node:16.10.0
WORKDIR /reverse-proxy
EXPOSE 443
COPY package*.json .
RUN npm ci
COPY . .
ENTRYPOINT ["npm", "start"]
