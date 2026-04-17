import { renderApplication } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from '../../src/app/app';
import { appConfig } from '../../src/app/app.config';

export async function handler(event: any) {
  try {
    const html = await renderApplication(
      () => bootstrapApplication(App, appConfig), // ✅ FIX
      {
        document: '<app-root></app-root>',
        url: event.rawUrl || event.path
      }
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: html
    };
  } catch (error) {
    console.error('SSR Error:', error);

    return {
      statusCode: 500,
      body: 'SSR Error'
    };
  }
}