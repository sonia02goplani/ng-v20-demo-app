import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
  createWebRequestFromNodeRequest,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { getContext } from '@netlify/angular-runtime/context.mjs';
import { createServer } from 'node:http';

const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEngineHandler(
  request: Request,
): Promise<Response> {
  const context = getContext();
  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * Request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);

if (isMainModule(import.meta.url)) {
  const port = Number(process.env['PORT']) || 4000;
  createServer((req, res) => {
    netlifyAppEngineHandler(createWebRequestFromNodeRequest(req))
      .then((response) => writeResponseToNodeResponse(response, res))
      .catch((err) => {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      });
  }).listen(port, () => {
    console.log(`Node server listening on http://localhost:${port}`);
  });
}
