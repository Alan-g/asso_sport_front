import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoursGestionPage } from './cours-gestion.page';

describe('CoursGestionPage', () => {
  let component: CoursGestionPage;
  let fixture: ComponentFixture<CoursGestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursGestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursGestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
