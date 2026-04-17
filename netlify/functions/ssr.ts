import type { Handler } from '@netlify/functions';
import serverless from 'serverless-http';

let cachedHandler: Handler | null = null;

export const handler: Handler = async (event, context) => {
  // #region agent log
  fetch('http://127.0.0.1:7482/ingest/4d2e83d5-3578-46da-9ccc-cb7cf8a016fe',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9f9e9'},body:JSON.stringify({sessionId:'f9f9e9',runId:'pre-fix',hypothesisId:'H1',location:'netlify/functions/ssr.ts:7',message:'SSR handler invoked',data:{path:event.path,method:event.httpMethod,hasCachedHandler:!!cachedHandler},timestamp:Date.now()})}).catch(()=>{});
  // #endregion agent log
  if (!cachedHandler) {
    // #region agent log
    fetch('http://127.0.0.1:7482/ingest/4d2e83d5-3578-46da-9ccc-cb7cf8a016fe',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9f9e9'},body:JSON.stringify({sessionId:'f9f9e9',runId:'pre-fix',hypothesisId:'H2',location:'netlify/functions/ssr.ts:10',message:'Importing server bundle',data:{importPath:'../../dist/ng-v20-demo-app/server/server.mjs',cwd:process.cwd()},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
    const { app } = await import(
      '../../dist/ng-v20-demo-app/server/server.mjs'
    );
    // #region agent log
    fetch('http://127.0.0.1:7482/ingest/4d2e83d5-3578-46da-9ccc-cb7cf8a016fe',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9f9e9'},body:JSON.stringify({sessionId:'f9f9e9',runId:'pre-fix',hypothesisId:'H3',location:'netlify/functions/ssr.ts:15',message:'Server bundle imported',data:{hasApp:!!app,appType:typeof app},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
    cachedHandler = serverless(app);
    // #region agent log
    fetch('http://127.0.0.1:7482/ingest/4d2e83d5-3578-46da-9ccc-cb7cf8a016fe',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9f9e9'},body:JSON.stringify({sessionId:'f9f9e9',runId:'pre-fix',hypothesisId:'H4',location:'netlify/functions/ssr.ts:17',message:'Serverless handler created',data:{hasCachedHandler:!!cachedHandler},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
  }

  return cachedHandler(event, context);
};
