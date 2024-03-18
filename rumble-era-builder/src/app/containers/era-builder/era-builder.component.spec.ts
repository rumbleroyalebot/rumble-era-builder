import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppModule } from "src/app/app.module";
import { EraBuilderComponent } from "./era-builder.component";

describe("EraBuilderComponent", () => {
  let component: EraBuilderComponent;
  let fixture: ComponentFixture<EraBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [AppModule, EraBuilderComponent],
});
    fixture = TestBed.createComponent(EraBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
