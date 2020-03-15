FROM node:12.13.0-alpine

WORKDIR '/app'

COPY package.json .

# This ordering means the npm installation is cached for the outer function handler.
RUN npm i

# Copy all the source code
COPY . .

ENTRYPOINT ["npm"]
CMD ["start"]

