import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EraBuilderComponent } from "./containers/era-builder/era-builder.component";
import { IndexPageComponent } from "./containers/index-page/index-page.component";

@NgModule({
  declarations: [
    AppComponent,
    EraBuilderComponent,
    IndexPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
