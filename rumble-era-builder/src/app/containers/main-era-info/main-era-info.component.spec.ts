import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MainEraInfoComponent } from "./main-era-info.component";
import { AppModule } from "src/app/app.module";

describe("MainEraInfoComponent", () => {
  let component: MainEraInfoComponent;
  let fixture: ComponentFixture<MainEraInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, MainEraInfoComponent],
    });
    fixture = TestBed.createComponent(MainEraInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
