import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayforothersPage } from './payforothers.page';

describe('PayforothersPage', () => {
  let component: PayforothersPage;
  let fixture: ComponentFixture<PayforothersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayforothersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayforothersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
