import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllChitsPage } from './all-chits.page';

describe('AllChitsPage', () => {
  let component: AllChitsPage;
  let fixture: ComponentFixture<AllChitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllChitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllChitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
