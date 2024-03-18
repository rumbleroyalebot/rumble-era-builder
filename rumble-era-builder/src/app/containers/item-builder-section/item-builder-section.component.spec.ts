import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemBuilderSectionComponent } from "./item-builder-section.component";

describe("ItemBuilderSectionComponent", () => {
  let component: ItemBuilderSectionComponent;
  let fixture: ComponentFixture<ItemBuilderSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItemBuilderSectionComponent],
    });
    fixture = TestBed.createComponent(ItemBuilderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
