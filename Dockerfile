# FROM node:21.0.0 AS build
# WORKDIR /client-app

# COPY package*.json ./
# RUN pnpm install

# COPY . .
# RUN pnpm run build

FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
COPY ./build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./doc/docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /client-app/build /usr/share/nginx/html
EXPOSE 80