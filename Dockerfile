FROM node:16.15.0
WORKDIR /usr/src/library_member_gate
COPY package.json ./
RUN yarn install
COPY . .

EXPOSE 3000
CMD ["yarn", "start"]