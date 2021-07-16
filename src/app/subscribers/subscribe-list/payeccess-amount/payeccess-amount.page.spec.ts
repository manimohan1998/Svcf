import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayeccessAmountPage } from './payeccess-amount.page';

describe('PayeccessAmountPage', () => {
  let component: PayeccessAmountPage;
  let fixture: ComponentFixture<PayeccessAmountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayeccessAmountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayeccessAmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
