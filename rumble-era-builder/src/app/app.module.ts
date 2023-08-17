import { MAT_COLOR_FORMATS, NgxMatColorPickerModule } from "@angular-material-components/color-picker";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HelpTableComponent } from "./components/help-table/help-table.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { EraBuilderComponent } from "./containers/era-builder/era-builder.component";
import { IndexPageComponent } from "./containers/index-page/index-page.component";
import { ItemBuilderSectionComponent } from "./containers/item-builder-section/item-builder-section.component";
import { MainEraInfoComponent } from "./containers/main-era-info/main-era-info.component";
import { PhraseBuilderSectionComponent } from "./containers/phrase-builder-section/phrase-builder-section.component";
import { RandomElementPipe } from "./pipes/random-element.pipe";

@NgModule({
  declarations: [
    AppComponent,
    EraBuilderComponent,
    IndexPageComponent,
    NavbarComponent,
    MainEraInfoComponent,
    PhraseBuilderSectionComponent,
    RandomElementPipe,
    HelpTableComponent,
    ItemBuilderSectionComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule, 
    HttpClientModule,
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
    RxReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: { display: { colorInput: "hex" } } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: "dynamic" } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
