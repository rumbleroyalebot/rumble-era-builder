import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MassEventBuilderSectionComponent } from "./mass-event-builder-section.component";

describe("MassEventBuilderSectionComponent", () => {
  let component: MassEventBuilderSectionComponent;
  let fixture: ComponentFixture<MassEventBuilderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MassEventBuilderSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MassEventBuilderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
