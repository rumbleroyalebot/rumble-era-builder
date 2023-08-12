import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EraBuilderComponent } from "./containers/era-builder/era-builder.component";

const routes: Routes = [
  // { path: "", component: IndexPageComponent },
  { path: "", component: EraBuilderComponent },
  { path: "builder", component: EraBuilderComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
