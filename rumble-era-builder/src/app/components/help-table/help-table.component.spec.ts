import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HelpTableComponent } from "./help-table.component";
import { MatTableModule } from "@angular/material/table";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";

describe("HelpTableComponent", () => {
  let component: HelpTableComponent;
  let fixture: ComponentFixture<HelpTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpTableComponent],
      imports: [MatTableModule, MatSlideToggleModule, FormsModule]
    });
    fixture = TestBed.createComponent(HelpTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
