# deepomatic-angular-ui

An easy way to interact with Deepomatic API

## NPM and Gulp Config

Install npm dependencies and execute all gulp tasks

```
npm install; gulp all;
```

## Nginx Block Example

It's important to add a proxy_pass from /api/ to Deepomatic API and set your private tokens

```
server {
  listen 80;
  listen [::]:80;

  server_name example.fr;

  index index.html;

  root /path/to/deepomatic-angular-ui/;

  location /api/ {
    client_max_body_size 20M;
    proxy_pass https://api.deepomatic.com/v0.6/;
    proxy_set_header X-APP-ID "SET_YOUR_APP_ID_HERE";
    proxy_set_header X-API-KEY "SET_YOUR_API_KEY_HERE";
    proxy_pass_request_headers on;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```
