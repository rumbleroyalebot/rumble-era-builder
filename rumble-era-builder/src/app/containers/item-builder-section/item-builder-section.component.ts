import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IFormGroup } from "@rxweb/reactive-form-validators";
import { ItemForm } from "src/app/models/forms/item-form";
import { PhraseForm } from "src/app/models/forms/phrase-form";

@Component({
  selector: "app-item-builder-section",
  templateUrl: "./item-builder-section.component.html",
  styleUrls: ["./item-builder-section.component.less"]
})
export class ItemBuilderSectionComponent {
  @Input({ required: true }) public formGroup: IFormGroup<ItemForm>;

  @Input() public placeholder = "";

  @Input() public id: number;

  @Output() public removeItem = new EventEmitter<number>();

  @Input({ required: true }) public killPhraseForm: PhraseForm[];
  
  @Input({ required: true }) public obtainPhraseForm: PhraseForm[];

  public tryRemoveItem() {
    if (confirm("Are you sure you want to remove this item? You will lose all its phrases.")) {
      this.removeItem.emit(this.id);
    }
  }
}
