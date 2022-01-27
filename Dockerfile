FROM node:16.13.2
WORKDIR /reverse-proxy
EXPOSE 443
COPY package*.json .
RUN npm ci
COPY . .
ENTRYPOINT ["npm", "start"]
