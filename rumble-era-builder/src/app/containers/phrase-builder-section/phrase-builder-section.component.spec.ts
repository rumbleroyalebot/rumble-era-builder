import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PhraseBuilderSectionComponent } from "./phrase-builder-section.component";
import { AppModule } from "src/app/app.module";

describe("PhraseBuilderSectionComponent", () => {
  let component: PhraseBuilderSectionComponent;
  let fixture: ComponentFixture<PhraseBuilderSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, PhraseBuilderSectionComponent],
    });
    fixture = TestBed.createComponent(PhraseBuilderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
