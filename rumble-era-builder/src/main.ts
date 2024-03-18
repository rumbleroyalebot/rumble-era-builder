import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { provideRouter } from "@angular/router";
import { ROUTES } from "./app/app-routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      RxReactiveFormsModule,
    ),
    provideRouter(ROUTES),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: "dynamic" },
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
