import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewActivityPage } from './new-activity.page';

describe('NewActivityPage', () => {
  let component: NewActivityPage;
  let fixture: ComponentFixture<NewActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
