import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-help-table",
  templateUrl: "./help-table.component.html",
  styleUrls: ["./help-table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpTableComponent {
  public showTable = false;
  public columns = ["p1_1", "p1_1+", "p1_2", "p1_3", "p1_4", "p1_w", "p1_is"];
  public data = [
    {p1_1: "he", p1_1plus: "He", p1_2: "him", p1_3: "his", p1_4: "himself", p1_w: "was", p1_is: "is"},
    {p1_1: "she", p1_1plus: "She", p1_2: "her", p1_3: "her", p1_4: "herself", p1_w: "was", p1_is: "is"},
    {p1_1: "they", p1_1plus: "They", p1_2: "them", p1_3: "their", p1_4: "themself", p1_w: "were", p1_is: "are"},
  ];
}
