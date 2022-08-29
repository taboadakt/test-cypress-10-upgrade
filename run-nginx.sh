#!/bin/sh

# This is for Docker to use. You dev don't have to run this.

# Build env file for the app to use
echo "window.env = {
  AUTH0_CLIENT_ID: \"$AUTH0_CLIENT_ID\",
  AUTH0_DOMAIN: \"$AUTH0_DOMAIN\",
  GRAPHQL_ENDPOINT: \"$GRAPHQL_ENDPOINT\",
};" > /usr/share/nginx/html/env.js

# Start up nginx to host built files
nginx -g 'daemon off;'
