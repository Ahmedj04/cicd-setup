FROM node:20.19.0
WORKDIR /app
COPY . .
CMD ["node", "main.js"]
