import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EraBuilderComponent } from "./containers/era-builder/era-builder.component";
import { PendingChangesGuard } from "./guards/pending-changes.guard";

const routes: Routes = [
  // { path: "", component: IndexPageComponent },
  { path: "builder", redirectTo: "", pathMatch: "full" },
  { path: "", component: EraBuilderComponent, canDeactivate: [PendingChangesGuard] }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
