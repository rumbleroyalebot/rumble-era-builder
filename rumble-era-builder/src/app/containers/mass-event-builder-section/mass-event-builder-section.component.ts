import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { IFormGroup, RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { PhraseBuilderSectionComponent } from "../phrase-builder-section/phrase-builder-section.component";
import { MassEventForm } from "src/app/models/forms/mass-event-form";
import { PhraseForm } from "src/app/models/forms/phrase-form";
import { ImagePreviewComponent } from "src/app/components/image-preview/image-preview.component";

@Component({
  selector: "app-mass-event-builder-section",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    PhraseBuilderSectionComponent,
    ImagePreviewComponent,
  ],
  templateUrl: "./mass-event-builder-section.component.html",
  styleUrls: ["./mass-event-builder-section.component.less"],
})
export class MassEventBuilderSectionComponent {
  @Input({ required: true }) public formGroup: IFormGroup<MassEventForm>;

  @Input() public placeholder = "";

  @Input() public id: number;

  @Output() public removeItem = new EventEmitter<number>();

  @Input({ required: true }) public phraseForm: PhraseForm[];

  public tryRemoveItem() {
    if (confirm("Are you sure you want to remove this event? You will lose all its phrases.")) {
      this.removeItem.emit(this.id);
    }
  }
}
