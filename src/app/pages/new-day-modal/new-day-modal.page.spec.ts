import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDayModalPage } from './new-day-modal.page';

describe('NewDayModalPage', () => {
  let component: NewDayModalPage;
  let fixture: ComponentFixture<NewDayModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDayModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDayModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
