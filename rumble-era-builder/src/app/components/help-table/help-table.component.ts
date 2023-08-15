import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-help-table",
  templateUrl: "./help-table.component.html",
  styleUrls: ["./help-table.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpTableComponent {
  public showTable = false;
  public columns = ["p1", "p1_1", "p1_1+", "p1_2", "p1_3", "p1_w"];
  public data = [
    {p1: "{name}", p1_1: "he", p1_1plus: "He", p1_2: "him", p1_3: "his", p1_w: "was"},
    {p1: "{name}", p1_1: "she", p1_1plus: "She", p1_2: "her", p1_3: "her", p1_w: "was"},
    {p1: "{name}", p1_1: "they", p1_1plus: "They", p1_2: "them", p1_3: "their", p1_w: "were"},
  ];
}
