# deepomatic-angular-ui

An easy way to interact with Deepomatic API

## Nginx Config

Add a proxy_pass to Deepomatic API and set your tokens

```
location /api/ {
  client_max_body_size 20M;
  proxy_pass https://api.deepomatic.com/v0.6/;
  proxy_set_header X-APP-ID "SET_YOUR_APP_ID_HERE";
  proxy_set_header X-API-KEY "SET_YOUR_API_KEY_HERE";
  proxy_pass_request_headers on;
}
```

## NPM and Gulp Config

```
npm install; gulp all;
```
