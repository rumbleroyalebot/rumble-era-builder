import { Component, Input, OnInit } from "@angular/core";
import {
  IFormGroup,
  RxReactiveFormsModule,
} from "@rxweb/reactive-form-validators";
import { EraMainForm } from "src/app/models/forms/era-main-form";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxColorsModule, validColorValidator } from "ngx-colors";

@Component({
  selector: "app-main-era-info",
  templateUrl: "./main-era-info.component.html",
  styleUrls: ["./main-era-info.component.less"],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxColorsModule,
  ],
})
export class MainEraInfoComponent implements OnInit {
  @Input({ required: true }) public formGroup: IFormGroup<EraMainForm>;

  public colourInput: FormControl;

  constructor() {
    this.colourInput = new FormControl("#0077ff");
  }

  public ngOnInit() {
    this.formGroup.controls.colour.addValidators(validColorValidator());

    this.colourInput.valueChanges.subscribe((colour) => {
      this.formGroup.controls.colour.setValue(colour, { emitEvent: false });
    });

    this.formGroup.controls.colour.valueChanges.subscribe((colour) => {
      if (this.formGroup.controls.colour.valid) {
        this.colourInput.setValue(colour, { emitEvent: false });
      }
    });
  }
}
