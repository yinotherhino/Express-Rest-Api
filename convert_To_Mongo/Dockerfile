FROM node:16-alpine3.16 AS development
    WORKDIR /app
    COPY package.json .
    COPY yarn.lock .
    RUN yarn
    COPY . .
    RUN npx tsc
    EXPOSE 3000
    ENV PORT=3000
    ENV SESSION_SECRET=yinotherhinoInc@123@#$
    CMD ["node", "./build/app.js"]

FROM node:16-alpine3.16 AS production
    RUN addgroup app && adduser -S -G app app
    RUN mkdir /app && chown app:app /app
    USER app
    WORKDIR /app
    COPY --from=development /app/package.json ./
    COPY --from=development /app/yarn.lock ./
    RUN yarn --production
    COPY . .
    COPY --from=development /app/build ./build
    EXPOSE 3000
    ENV PORT=3000
    ENV SESSION_SECRET=yinotherhinoInc@123@#$
    CMD ["yarn", "start"]
