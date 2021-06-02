import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowChitsPage } from './show-chits.page';

describe('ShowChitsPage', () => {
  let component: ShowChitsPage;
  let fixture: ComponentFixture<ShowChitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowChitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowChitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
