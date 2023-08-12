
import { Component } from "@angular/core";
import { IFormGroup, RxFormBuilder } from "@rxweb/reactive-form-validators";
import { EraMainForm } from "src/app/models/forms/era-main.form";
import { EraJsonGeneratorService } from "src/app/services/era-json-generator.service";

@Component({
  templateUrl: "./era-builder.component.html",
  styleUrls: ["./era-builder.component.less"]
})
export class EraBuilderComponent {

  public formGroup: IFormGroup<EraMainForm>;

  public eraJson = "";
  public lineCount = 10;

  constructor(
    private readonly jsonService: EraJsonGeneratorService,
    formBuilder: RxFormBuilder
  ) {
    this.formGroup = formBuilder.formGroup(EraMainForm) as IFormGroup<EraMainForm>;
  }

  private getErrorMessages(): string {
    return Object.values(this.formGroup.controls)
      .map(control => Object.values(control.errors || {})
        .map(error => error.message)
        .join("\n"))
      .filter(message => message)
      .join("\n");
  }

  public buildEra() {
    const era = this.formGroup.value;
    if (this.formGroup.valid) {
      this.eraJson = JSON.stringify(this.jsonService.generateEraJSON(era), null, 2);
    } else {
      this.eraJson = this.getErrorMessages();
    }
    this.lineCount = this.eraJson.split("\n").length;
  }

  public loadEra(text: string) {
    const era = this.jsonService.parseJSON(text);
    this.formGroup.patchModelValue(era);
    this.lineCount = text.split("\n").length;
  }
}
