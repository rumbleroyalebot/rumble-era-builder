import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EraBuilderComponent } from "./containers/era-builder/era-builder.component";
import { IndexPageComponent } from "./containers/index-page/index-page.component";

const routes: Routes = [
  { path: "", component: IndexPageComponent },
  { path: "builder", component: EraBuilderComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
