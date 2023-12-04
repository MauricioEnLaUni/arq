FROM node:21-bookworm-slim
EXPOSE 3000
USER node
WORKDIR /app
COPY --chown=node:node package.json ./
RUN npm ci --ommit-dev && npm cache clean --force
COPY --chown=node . .
CMD ["node", "./bin/www"]