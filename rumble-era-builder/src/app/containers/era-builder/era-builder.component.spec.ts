import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EraBuilderComponent } from "./era-builder.component";

describe("EraBuilderComponent", () => {
  let component: EraBuilderComponent;
  let fixture: ComponentFixture<EraBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EraBuilderComponent]
    });
    fixture = TestBed.createComponent(EraBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
