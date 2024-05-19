import { Routes } from "@angular/router";
import { EraBuilderComponent } from "./containers/era-builder/era-builder.component";
import { PendingChangesGuard } from "./guards/pending-changes.guard";
import { GuideComponent } from "./containers/guide/guide.component";
import { FaqComponent } from "./containers/faq/faq.component";

export const ROUTES: Routes = [
  // { path: "", component: IndexPageComponent },
  { path: "builder", redirectTo: "", pathMatch: "full" },
  {
    path: "",
    component: EraBuilderComponent,
    canDeactivate: [PendingChangesGuard],
  },
  { path: "guide", component: GuideComponent },
  { path: "faq", component: FaqComponent },
];

