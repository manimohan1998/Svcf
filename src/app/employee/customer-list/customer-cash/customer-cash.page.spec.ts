import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerCashPage } from './customer-cash.page';

describe('CustomerCashPage', () => {
  let component: CustomerCashPage;
  let fixture: ComponentFixture<CustomerCashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
