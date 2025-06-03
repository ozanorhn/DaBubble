import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  window.addEventListener('unhandledrejection', (event) => {
  console.error('Global Unhandled Promise Rejection:', event.reason);
});