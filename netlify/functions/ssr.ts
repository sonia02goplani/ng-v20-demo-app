import type { Handler } from '@netlify/functions';
import serverless from 'serverless-http';

let cachedHandler: Handler | null = null;

export const handler: Handler = async (event, context) => {
  if (!cachedHandler) {
    const { app } = await import(
      '../../dist/ng-v20-demo-app/server/server.mjs'
    );
    cachedHandler = serverless(app);
  }

  return cachedHandler(event, context);
};
