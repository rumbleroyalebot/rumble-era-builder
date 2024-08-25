import { Component, Renderer2, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-faq",
  standalone: true,
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.less"],
  imports: [RouterLink],
})
export class FaqComponent implements AfterViewInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  private listeners: (() => void)[] = [];

  ngAfterViewInit() {
    const questionElements: NodeListOf<HTMLElement> =
      this.el.nativeElement.querySelectorAll(".question");

    questionElements.forEach((question: HTMLElement) => {
      const listener = this.renderer.listen(question, "click", () => {
        const answer: HTMLElement | null = question.nextElementSibling as HTMLElement;
        const icon: HTMLElement | null = question.querySelector(".icon");

        const faqItem = question.closest(".faq-item");
        if (faqItem) {
          faqItem.classList.toggle("active");
        }

        if (answer.style.maxHeight) {
          answer.style.maxHeight = "";
          if (icon) {
            icon.style.transform = "rotate(0deg)";
          }
        } else {
          answer.style.maxHeight = `${answer.scrollHeight}px`;
          if (icon) {
            icon.style.transform = "rotate(180deg)";
          }
        }
      });
      this.listeners.push(listener);
    });
  }

  ngOnDestroy() {
    this.listeners.forEach((unlisten) => unlisten());
  }
}
