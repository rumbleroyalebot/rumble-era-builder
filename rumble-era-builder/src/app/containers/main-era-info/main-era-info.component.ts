import { Component, Input } from "@angular/core";
import { IFormGroup } from "@rxweb/reactive-form-validators";
import { EraMainForm } from "src/app/models/forms/era-main-form";

@Component({
  selector: "app-main-era-info",
  templateUrl: "./main-era-info.component.html",
  styleUrls: ["./main-era-info.component.less"]
})
export class MainEraInfoComponent {
  @Input({ required: true }) public formGroup: IFormGroup<EraMainForm>;
}
