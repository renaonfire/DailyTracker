import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDayPage } from './view-day.page';

describe('ViewDayPage', () => {
  let component: ViewDayPage;
  let fixture: ComponentFixture<ViewDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
