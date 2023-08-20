import { ChangeDetectionStrategy, Component, Renderer2 } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  isPinkBlueGrey = false;

  constructor(private renderer: Renderer2) {}

  toggleStyles() {
    this.isPinkBlueGrey = !this.isPinkBlueGrey;
    const linkElement = document.getElementById("theme-link") as HTMLLinkElement;
    const body = document.body;

    if (this.isPinkBlueGrey) {
      linkElement.href = "assets/pink-bluegrey.css";
      this.renderer.addClass(body, "dark-mode");
    } else {
      linkElement.href = "assets/indigo-pink.css";
      this.renderer.removeClass(body, "dark-mode");
    }
  }  
}
