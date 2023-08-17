import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { IFormGroup, RxFormArray, RxFormBuilder } from "@rxweb/reactive-form-validators";
import { PhraseForm } from "src/app/models/forms/phrase-form";

@Component({
  selector: "app-phrase-builder-section",
  templateUrl: "./phrase-builder-section.component.html",
  styleUrls: ["./phrase-builder-section.component.less"]
})
export class PhraseBuilderSectionComponent implements OnInit {
  @Input() public heading: string;
  @Input() public infoText = "";

  @Input() public placeholders: string[] = [];

  @Input() public playerCount: 0 | 1 | 2 = 0;

  @Input() public hasItem = false;

  @Input({ required: true }) public phraseFormArray: RxFormArray;

  @Input({ required: true }) public set phraseForm(phraseForm: PhraseForm[]) {
    this.phraseFormArray.clear();
    this.formGroups = [];

    (phraseForm ?? []).forEach(value => {
      const fg = this.formBuilder.formGroup(value);
      this.phraseFormArray.push(fg);
      this.formGroups.push(fg as unknown as IFormGroup<PhraseForm>)
    });
  }

  public formGroups: IFormGroup<PhraseForm>[] = [];

  constructor(
    private readonly formBuilder: RxFormBuilder
  ) { }

  public ngOnInit(): void {
    if (this.phraseFormArray?.length == 0) {
      setTimeout(() => this.addPhrase());
    }
  }

  public addPhrase() {
    const fg = this.formBuilder.formGroup(new PhraseForm()) as unknown as IFormGroup<PhraseForm>;
    fg.controls.phrase.setValue("");
    this.phraseFormArray.push(fg);
    this.formGroups.push(fg);

    fg.controls.phrase.addValidators(this.requiredPatternValidator);
  }

  public removePhrase() {
    this.phraseFormArray.removeAt(-1);
    this.formGroups.pop();
  }

  private requiredPatternValidator = (control: AbstractControl<string>) => {
    let includesPattern = true;
    let error = "";
    if (this.playerCount == 1) {
      includesPattern = control.value.includes("{p1}") ?? false;
      error = "Phrase must include exactly one player. ({p1} pattern) ";
    }
    else if (this.playerCount == 2) {
      includesPattern = (control.value?.includes("{p1}") ?? false) && control.value.includes("{p2}");
      error = "Phrase must include exactly two players. ({p1} and {p2} patterns) ";
    }

    if (this.hasItem) {
      includesPattern = control.value.includes("{item}") ?? false;
      error += "Phrase must include item name. ({item} pattern)";
    }

    return !includesPattern ? { "includesRequiredPatterns": { message: error } } : null;
  };
}
