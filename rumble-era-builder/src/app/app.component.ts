import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.less"],
    standalone: true,
    imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent implements OnInit {
    public ngOnInit() {
        const linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = "./assets/indigo-pink.css";
        document.head.appendChild(linkElement);
    }
}
