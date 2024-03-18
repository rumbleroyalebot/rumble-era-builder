import { importProvidersFrom } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule } from "@angular-material-components/color-picker";
import { provideRouter } from "@angular/router";
import { ROUTES } from "./app/app-routes";


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
            BrowserModule,
            FormsModule,
            MatButtonModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatSlideToggleModule,
            MatSnackBarModule,
            MatTabsModule,
            MatTableModule,
            MatToolbarModule,
            NgxMatColorPickerModule,
            ReactiveFormsModule,
            RxReactiveFormsModule
        ),
        provideRouter(ROUTES),
        { provide: MAT_COLOR_FORMATS, useValue: { display: { colorInput: "hex" } } },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: "dynamic" } },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .catch(err => console.error(err));
