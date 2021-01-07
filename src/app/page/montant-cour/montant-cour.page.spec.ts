import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MontantCourPage } from './montant-cour.page';

describe('MontantCourPage', () => {
  let component: MontantCourPage;
  let fixture: ComponentFixture<MontantCourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontantCourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MontantCourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
