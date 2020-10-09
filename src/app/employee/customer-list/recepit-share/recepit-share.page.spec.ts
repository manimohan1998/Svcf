import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecepitSharePage } from './recepit-share.page';

describe('RecepitSharePage', () => {
  let component: RecepitSharePage;
  let fixture: ComponentFixture<RecepitSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepitSharePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecepitSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
