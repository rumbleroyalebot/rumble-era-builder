import { Component, Input } from "@angular/core";
import { IFormGroup, RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { EraMainForm } from "src/app/models/forms/era-main-form";
import { NgxMatColorPickerModule } from "@angular-material-components/color-picker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-main-era-info",
    templateUrl: "./main-era-info.component.html",
    styleUrls: ["./main-era-info.component.less"],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, RxReactiveFormsModule, MatFormFieldModule, MatInputModule, NgxMatColorPickerModule]
})
export class MainEraInfoComponent {
  @Input({ required: true }) public formGroup: IFormGroup<EraMainForm>;
}
