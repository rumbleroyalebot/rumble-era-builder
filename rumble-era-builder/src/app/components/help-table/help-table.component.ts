import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@Component({
    selector: "app-help-table",
    templateUrl: "./help-table.component.html",
    styleUrls: ["./help-table.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatSlideToggleModule, FormsModule, RxReactiveFormsModule, MatTableModule]
})
export class HelpTableComponent {
  public showTable = false;
  public columns = ["p1_1", "p1_1+", "p1_2", "p1_3", "p1_4", "p1_w"];
  public data = [
    {p1_1: "he", p1_1plus: "He", p1_2: "him", p1_3: "his", p1_4: "himself", p1_w: "was"},
    {p1_1: "she", p1_1plus: "She", p1_2: "her", p1_3: "her", p1_4: "herself", p1_w: "was"},
    {p1_1: "they", p1_1plus: "They", p1_2: "them", p1_3: "their", p1_4: "themself", p1_w: "were"},
  ];
}
