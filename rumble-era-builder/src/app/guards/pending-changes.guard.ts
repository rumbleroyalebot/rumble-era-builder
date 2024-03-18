import { CanDeactivateFn } from "@angular/router";
import { Observable } from "rxjs";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const PendingChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (
  component: ComponentCanDeactivate,
) => {
  if (!component.canDeactivate()) {
    return confirm(
      "WARNING: You have unsaved changes. Make sure to download new era file to not lose them.",
    );
  }
  return true;
};
