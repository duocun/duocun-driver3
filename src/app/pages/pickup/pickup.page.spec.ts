import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { PickupPage } from "./pickup.page";

describe("PickupPage", () => {
  let component: PickupPage;
  let fixture: ComponentFixture<PickupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PickupPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
