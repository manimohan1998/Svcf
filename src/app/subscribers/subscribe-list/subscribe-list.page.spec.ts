import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubscribeListPage } from './subscribe-list.page';

describe('SubscribeListPage', () => {
  let component: SubscribeListPage;
  let fixture: ComponentFixture<SubscribeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
