import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { EraBuilderComponent } from "./containers/era-builder/era-builder.component";
import { IndexPageComponent } from "./containers/index-page/index-page.component";
import { MainEraInfoComponent } from "./containers/main-era-info/main-era-info.component";
import { MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS, NgxMatColorPickerModule } from "@angular-material-components/color-picker";
import { PhraseBuilderSectionComponent } from "./containers/phrase-builder-section/phrase-builder-section.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    EraBuilderComponent,
    IndexPageComponent,
    NavbarComponent,
    MainEraInfoComponent,
    PhraseBuilderSectionComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    NgxMatColorPickerModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: { display: { colorInput: "hex" } } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: "dynamic" } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
