
import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IFormGroup, RxFormArray, RxFormBuilder } from "@rxweb/reactive-form-validators";
import { EraMainForm } from "src/app/models/forms/era-main-form";
import { EraJsonGeneratorService } from "src/app/services/era-json-generator.service";

@UntilDestroy()
@Component({
  templateUrl: "./era-builder.component.html",
  styleUrls: ["./era-builder.component.less"]
})
export class EraBuilderComponent implements OnInit {

  public formGroup: IFormGroup<EraMainForm>;
  public loadingPhrasesFormArray: RxFormArray;
  public killPhrasesFormArray: RxFormArray;
  public revivePhrasesFormArray: RxFormArray;
  public deathPhrasesFormArray: RxFormArray;

  public eraJson = "";
  public era: EraMainForm | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sampleEra: any;
  public samplePhrases = { 
    loading: [],
    kill: [],
    death: [],
    revive: []
  };

  public showHelpTable = false;

  constructor(
    private readonly jsonService: EraJsonGeneratorService,
    private readonly formBuilder: RxFormBuilder
  ) {
    this.formGroup = this.formBuilder.formGroup(EraMainForm) as IFormGroup<EraMainForm>;
    this.loadingPhrasesFormArray = this.formGroup.controls.loadingPhrases as unknown as RxFormArray;
    this.killPhrasesFormArray = this.formGroup.controls.killPhrases as unknown as RxFormArray;
    this.revivePhrasesFormArray = this.formGroup.controls.revivePhrases as unknown as RxFormArray;
    this.deathPhrasesFormArray = this.formGroup.controls.deathPhrases as unknown as RxFormArray;
  }
  public ngOnInit() {
    this.jsonService.loadSampleEra()
      .pipe(untilDestroyed(this))
      .subscribe(era => {
        this.sampleEra = era;
        this.samplePhrases.loading = era.phrases.loading;
        this.samplePhrases.kill = Object.values(era.phrases.default.kill);
        this.samplePhrases.death = Object.values(era.phrases.default.death);
        this.samplePhrases.revive = Object.values(era.phrases.default.revive);
      });
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
    this.formGroup.markAllAsTouched();
    const era = this.formGroup.value;
    if (this.formGroup.valid) {
      this.eraJson = JSON.stringify(this.jsonService.generateEraJSON(era), null, 2);
    } else {
      this.eraJson = "Fix all errors to generate custom era." //this.getErrorMessages();
    }
  }

  public loadEra(text: string) {
    this.era = this.jsonService.parseJSON(text);
    this.formGroup.patchModelValue(this.era);
  }

  public toggleHelpTable() {
    this.showHelpTable = !this.showHelpTable;
  }
}
