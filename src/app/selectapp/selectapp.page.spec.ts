import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectappPage } from './selectapp.page';

describe('SelectappPage', () => {
  let component: SelectappPage;
  let fixture: ComponentFixture<SelectappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectappPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
