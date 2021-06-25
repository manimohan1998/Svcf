import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewcustomerPaymentPage } from './newcustomer-payment.page';

describe('NewcustomerPaymentPage', () => {
  let component: NewcustomerPaymentPage;
  let fixture: ComponentFixture<NewcustomerPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcustomerPaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewcustomerPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
