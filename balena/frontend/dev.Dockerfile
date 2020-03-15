FROM node:12.13.0-alpine

WORKDIR '/app'

COPY package.json .

RUN npm i

# Copy all the source code
COPY . .

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]

