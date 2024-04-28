FROM node:18 As builder
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY public/ public/
COPY components.json .
COPY postcss.config.js .
COPY tailwind.config.ts .
COPY tsconfig.json .
COPY vite.config.ts .
COPY app/ app/
RUN npm run build

FROM amazon/aws-lambda-nodejs:18
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=8080

COPY --from=builder /build/build ./build
COPY package*.json ./
RUN npm ci
COPY server.js .
ENTRYPOINT [ "node" ]
CMD ["server.js"]