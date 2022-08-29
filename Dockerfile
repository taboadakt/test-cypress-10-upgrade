# Build Stage
ARG base_image=node:16.13-alpine
ARG nginx_base_image=nginx:1.18
FROM ${base_image} as build-stage
WORKDIR /app
  # Copying the package*.json files as a separate step seems redundant, but this
  # allows us to take advantage of Docker's caching layers mechanism. This way,
  # we can avoid rebuilding our dependencies everytime we rebuild our container.
  # http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package*.json ./
COPY . .
  # Have npm point to our private npm registry (via verdaccio)
RUN npm config set registry https://npm.odeko.com
  # Husky is problematic w/ ci --production so until the following is resolved
  # we're dynamically resetting the 'prepare' script to not need husky
  # https://github.com/typicode/husky/issues/914
RUN npm set-script prepare ""
  # NOTE: If you're using node-sass, please change below to
  # RUN npm rebuild node-sass && npm ci
  # Why?
  # node-sass is a native module so the version installed depends on the underlying
  # platform and node.js version. We'll reinstall node-sass for this reason.
RUN npm ci
RUN npm run build

# Run Stage
FROM ${nginx_base_image} as run-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/run-nginx.sh /usr/share/nginx
EXPOSE 8080
  # Setting daemon off runs nginx in the foreground since the default is running
  # it in the background. This is a best practice so we have a 1:1 mapping
  # between a container and a process
CMD ["/bin/sh", "/usr/share/nginx/run-nginx.sh"]
