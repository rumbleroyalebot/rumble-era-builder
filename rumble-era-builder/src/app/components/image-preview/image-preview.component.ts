import { Component, Input } from "@angular/core";

@Component({
  selector: "app-image-preview",
  standalone: true,
  imports: [],
  templateUrl: "./image-preview.component.html",
  styleUrl: "./image-preview.component.less",
})
export class ImagePreviewComponent {
  @Input({ required: true }) public imageUrl: string;
}
