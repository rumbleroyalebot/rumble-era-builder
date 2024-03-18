import { Routes } from "@angular/router";
import { EraBuilderComponent } from "./containers/era-builder/era-builder.component";
import { PendingChangesGuard } from "./guards/pending-changes.guard";

export const ROUTES: Routes = [
  // { path: "", component: IndexPageComponent },
  { path: "builder", redirectTo: "", pathMatch: "full" },
  {
    path: "",
    component: EraBuilderComponent,
    canDeactivate: [PendingChangesGuard],
  },
];
