import { App } from './app/app.ts';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(App).catch((err: unknown) => {
  console.error(err);
});
