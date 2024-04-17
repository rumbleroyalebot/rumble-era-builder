import { Component, HostListener, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import {
  IFormGroup,
  RxFormArray,
  RxFormBuilder,
  RxReactiveFormsModule,
} from "@rxweb/reactive-form-validators";
import { ComponentCanDeactivate } from "src/app/guards/pending-changes.guard";
import { EraMainForm } from "src/app/models/forms/era-main-form";
import { ItemForm } from "src/app/models/forms/item-form";
import { EraJsonGeneratorService } from "src/app/services/era-json-generator.service";
import { RandomElementPipe } from "../../pipes/random-element.pipe";
import { TitleCasePipe } from "@angular/common";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ItemBuilderSectionComponent } from "../item-builder-section/item-builder-section.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { PhraseBuilderSectionComponent } from "../phrase-builder-section/phrase-builder-section.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { HelpTableComponent } from "../../components/help-table/help-table.component";
import { MainEraInfoComponent } from "../main-era-info/main-era-info.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MassEventForm } from "src/app/models/forms/mass-event-form";
import { MassEventBuilderSectionComponent } from "../mass-event-builder-section/mass-event-builder-section.component";

@UntilDestroy()
@Component({
  templateUrl: "./era-builder.component.html",
  styleUrls: ["./era-builder.component.less"],
  standalone: true,
  imports: [
    FormsModule,
    MainEraInfoComponent,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HelpTableComponent,
    MatTabsModule,
    MatIconModule,
    PhraseBuilderSectionComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ItemBuilderSectionComponent,
    MassEventBuilderSectionComponent,
    MatSlideToggleModule,
    TextFieldModule,
    TitleCasePipe,
    RandomElementPipe,
  ],
})
export class EraBuilderComponent implements OnInit, ComponentCanDeactivate {
  public formGroup: IFormGroup<EraMainForm>;
  public loadingPhrasesFormArray: RxFormArray;
  public killPhrasesFormArray: RxFormArray;
  public revivePhrasesFormArray: RxFormArray;
  public deathPhrasesFormArray: RxFormArray;
  public lifePhrasesFormArray: RxFormArray;
  public itemFormArray: RxFormArray;
  public massKillFormArray: RxFormArray;
  public massReviveFormArray: RxFormArray;

  public eraJson = "";
  public era: EraMainForm | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sampleEra: any;
  public samples = {
    loading: [],
    kill: [],
    death: [],
    revive: [],
    life: [],
    items: [],
    massKill: [],
    massRevive: [],
  };

  public showHelpTable = false;
  public showPreview = false;
  public newItemName = "";
  public newMassKillEventName = "";
  public newMassReviveEventName = "";

  constructor(
    private readonly jsonService: EraJsonGeneratorService,
    private readonly formBuilder: RxFormBuilder,
    private readonly snackBar: MatSnackBar,
  ) {
    this.formGroup = this.formBuilder.formGroup(EraMainForm) as IFormGroup<EraMainForm>;
    this.loadingPhrasesFormArray = this.formGroup.controls.loadingPhrases as unknown as RxFormArray;
    this.killPhrasesFormArray = this.formGroup.controls.killPhrases as unknown as RxFormArray;
    this.revivePhrasesFormArray = this.formGroup.controls.revivePhrases as unknown as RxFormArray;
    this.deathPhrasesFormArray = this.formGroup.controls.deathPhrases as unknown as RxFormArray;
    this.lifePhrasesFormArray = this.formGroup.controls.lifePhrases as unknown as RxFormArray;
    this.itemFormArray = this.formGroup.controls.items as unknown as RxFormArray;
    this.massKillFormArray = this.formGroup.controls.massKill as unknown as RxFormArray;
    this.massReviveFormArray = this.formGroup.controls.massRevive as unknown as RxFormArray;
  }

  public ngOnInit() {
    this.jsonService
      .loadSampleEra()
      .pipe(untilDestroyed(this))
      .subscribe((era) => {
        this.sampleEra = era;
        this.samples.loading = era.phrases.loading;
        this.samples.kill = Object.values(era.phrases.default.kill);
        this.samples.death = Object.values(era.phrases.default.death);
        this.samples.revive = Object.values(era.phrases.default.revive);
        this.samples.life = Object.values(era.phrases.default.life);
        this.samples.items = era.items;
        this.samples.massKill = era.events.mass_kill.available;
        this.samples.massRevive = era.events.mass_revive.available;
      });

    // this.formGroup.valueChanges
    //   .pipe(
    //     untilDestroyed(this),
    //     auditTime(1000)
    //   )
    //   .subscribe(() => {
    //     const era = this.formGroup.value;
    //     if (this.formGroup.valid) {
    //       this.eraJson = JSON.stringify(this.jsonService.generateEraJSON(era), null, 2);
    //     } else {
    //       this.eraJson = "Fix all errors to generate custom era."
    //     }
    //   })
  }

  canDeactivate(): boolean {
    return false;
  }

  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: BeforeUnloadEvent): void {
    if (this.formGroup.dirty) {
      $event.preventDefault();
      $event.returnValue =
        "WARNING: You have unsaved changes. Make sure to download new era file to not lose them.";
    }
  }

  private getErrorMessages(): string {
    return Object.values(this.formGroup.controls)
      .map((control) =>
        Object.values(control.errors || {})
          .map((error) => error.message)
          .join("\n"),
      )
      .filter((message) => message)
      .join("\n");
  }

  public buildEra() {
    this.formGroup.markAllAsTouched();
    const era = this.formGroup.value;
    if (this.itemFormArray?.length < 1) {
      this.openSnackBar("Era must have at least one item!");
      this.eraJson = "Era must have at least one item!";
      return;
    }
    if (this.formGroup.valid) {
      this.eraJson = JSON.stringify(this.jsonService.generateEraJSON(era), null, 2);
      this.openSnackBar("Era generated.");
    } else {
      this.openSnackBar("Fix all errors to generate custom era.");
      this.eraJson = "Fix all errors to generate custom era."; //this.getErrorMessages();
    }
  }

  public loadEra(text: string) {
    const parsed = this.jsonService.parseJSON(text);
    this.itemFormArray.clear();
    this.massKillFormArray.clear();
    this.massReviveFormArray.clear();
    this.era = parsed ?? new EraMainForm();
    if (parsed == null) {
      this.openSnackBar("Invalid era file. Could not be loaded.");
      return;
    }
    this.era.items.forEach((form) => this.itemFormArray.push(this.formBuilder.formGroup(form)));
    this.era.massKill.forEach((form) =>
      this.massKillFormArray.push(this.formBuilder.formGroup(form)),
    );
    this.era.massRevive.forEach((form) =>
      this.massReviveFormArray.push(this.formBuilder.formGroup(form)),
    );
    this.formGroup.patchModelValue(this.era);
    this.openSnackBar("Era loaded.");
  }

  public addItem() {
    const fg = this.formBuilder.formGroup(ItemForm) as IFormGroup<ItemForm>;
    fg.controls.name.setValue(this.newItemName || "Item");
    this.itemFormArray.push(fg);
    this.newItemName = "";
  }

  public addMassKillEvent() {
    const fg = this.formBuilder.formGroup(MassEventForm) as IFormGroup<MassEventForm>;
    fg.controls.name.setValue(this.newMassKillEventName || "Event Name");
    this.massKillFormArray.push(fg);
    this.newMassKillEventName = "";
  }

  public addMassReviveEvent() {
    const fg = this.formBuilder.formGroup(MassEventForm) as IFormGroup<MassEventForm>;
    fg.controls.name.setValue(this.newMassReviveEventName || "Event Name");
    this.massReviveFormArray.push(fg);
    this.newMassReviveEventName = "";
  }

  public removeItem(index: number) {
    this.era?.items.splice(index, 1);
    this.itemFormArray.removeAt(index);
  }

  public removeMassKillEvent(index: number) {
    this.era?.massKill.splice(index, 1);
    this.massKillFormArray.removeAt(index);
  }

  public removeMassReviveEvent(index: number) {
    this.era?.massRevive.splice(index, 1);
    this.massReviveFormArray.removeAt(index);
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      this.openSnackBar("No file was uploaded.");
      return;
    }

    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result as string;
        this.loadEra(content);
      };
      reader.readAsText(file);
    }
  }

  public downloadEra() {
    this.formGroup.markAllAsTouched();
    const era = this.formGroup.value;
    if (this.itemFormArray?.length < 1) {
      this.openSnackBar("Era must have at least one item!");
      this.eraJson = "Era must have at least one item!";
      return;
    }
    if (!this.formGroup.valid) {
      this.openSnackBar("Fix all errors to generate custom era.");
      this.eraJson = "Fix all errors to generate custom era."; //this.getErrorMessages();
      return;
    }

    const json = this.jsonService.generateEraJSON(era);
    this.eraJson = JSON.stringify(json, null, 2);

    const fileName = era.name.toLowerCase().replace(" ", "_") + ".json";
    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.openSnackBar("Era file download started.");
    this.formGroup.markAsPristine();
  }

  private openSnackBar(message: string, action = "Dismiss") {
    this.snackBar.open(message, action, { duration: 5000 });
  }
}
