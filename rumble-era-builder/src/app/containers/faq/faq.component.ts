import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
  imports:[RouterModule]
})
export class FaqComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.renderer.listen('document', 'DOMContentLoaded', () => {
      const questionElements = this.el.nativeElement.querySelectorAll('.question');

      questionElements.forEach((question: HTMLElement) => {
        this.renderer.listen(question, 'click', () => {
          const answer = question.nextElementSibling as HTMLElement;
          const icon = question.querySelector('.icon') as HTMLElement;

          question.closest('.faq-item')?.classList.toggle('active');

          if (answer.style.maxHeight) {
            answer.style.maxHeight = '';
            if (icon) {
              icon.style.transform = 'rotate(0deg)';
            }
          } else {
            answer.style.maxHeight = `${answer.scrollHeight}px`;
            if (icon) {
              icon.style.transform = 'rotate(180deg)';
            }
          }
        });
      });
    });
  }
}
