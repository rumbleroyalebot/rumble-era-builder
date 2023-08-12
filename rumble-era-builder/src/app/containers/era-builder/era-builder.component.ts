import { Color } from "@angular-material-components/color-picker";
import { Component } from "@angular/core";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-form-validators";
import { EraMainForm } from "src/app/models/forms/era-main.form";

@Component({
  templateUrl: "./era-builder.component.html",
  styleUrls: ["./era-builder.component.less"]
})
export class EraBuilderComponent {

  public formGroup: IFormGroup<EraMainForm>;

  public eraJson = "";

  constructor(
    formBuilder: RxFormBuilder
  ) {
    this.formGroup = formBuilder.formGroup(EraMainForm) as IFormGroup<EraMainForm>;
  }

  public buildEra() {
    const era = this.formGroup.value;
    const json = JSON.parse(JSON.stringify(era));
    json.colour = parseInt(era.colour.toHex(), 16);
    this.eraJson = JSON.stringify(json, null, 2);
  }
}
