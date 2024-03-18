import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  IFormGroup,
  RxFormArray,
  RxFormBuilder,
  RxReactiveFormsModule,
} from "@rxweb/reactive-form-validators";
import { PhraseForm } from "src/app/models/forms/phrase-form";
import { RandomElementPipe } from "../../pipes/random-element.pipe";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-phrase-builder-section",
  templateUrl: "./phrase-builder-section.component.html",
  styleUrls: ["./phrase-builder-section.component.less"],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RandomElementPipe,
  ],
})
export class PhraseBuilderSectionComponent implements OnInit {
  @Input() public heading: string;
  @Input() public infoText = "";

  @Input() public placeholders: string[] = [];

  @Input() public playerCount: 0 | 1 | 2 = 0;

  @Input() public hasItem = false;
  @Input() public hasItemUnlock = false;

  @Input({ required: true }) public phraseFormArray: RxFormArray;

  @Input({ required: true }) public set phraseForm(phraseForm: PhraseForm[]) {
    this.phraseFormArray.clear();
    this.formGroups = [];

    (phraseForm ?? []).forEach((value) => {
      const fg = this.formBuilder.formGroup(value);
      this.phraseFormArray.push(fg);
      this.formGroups.push(fg as unknown as IFormGroup<PhraseForm>);
    });
  }

  public formGroups: IFormGroup<PhraseForm>[] = [];

  constructor(private readonly formBuilder: RxFormBuilder) {}

  public ngOnInit(): void {
    if (this.phraseFormArray?.length == 0) {
      setTimeout(() => this.addPhrase());
    }
  }

  public addPhrase() {
    const fg = this.formBuilder.formGroup(
      new PhraseForm(),
    ) as unknown as IFormGroup<PhraseForm>;
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
      const condition = control.value.includes("{p1}");
      includesPattern &&= condition;
      if (!condition) {
        error += "Phrase must include exactly one player ({p1}). ";
      }
    } else if (this.playerCount == 2) {
      const condition =
        control.value.includes("{p1}") && control.value.includes("{p2}");
      includesPattern &&= condition;
      if (!condition) {
        error += "Phrase must include exactly two players ({p1} and {p2}). ";
      }
    }

    if (this.hasItem) {
      const condition = control.value.includes("{item}");
      includesPattern &&= condition;
      if (!condition) {
        error += "Phrase must include item name. ({item} pattern) ";
      }
    }

    if (this.hasItemUnlock) {
      const condition = control.value.includes("__{item}__");
      includesPattern &&= condition;
      if (!condition) {
        error +=
          "Unlock phrases must include item name surrounded by double underscores. (__{item}__) ";
      }
    }

    return !includesPattern
      ? { includesRequiredPatterns: { message: error } }
      : null;
  };
}
