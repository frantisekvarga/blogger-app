// environment variables are defined in .env files and serverless.yml
export const config = {
  stage: import.meta.env.VITE_STAGE as string,
  httpServiceUrl: import.meta.env.VITE_HTTP_SERVICE_URL as string,
  websocketServiceUrl: import.meta.env.VITE_WEBSOCKET_SERVICE_URL as string,
  userPool: {
    id: import.meta.env.VITE_USER_POOL_ID as string,
    clientId: import.meta.env.VITE_USER_POOL_CLIENT_ID as string,
  },
};
