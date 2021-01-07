import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionDroitPage } from './gestion-droit.page';

describe('GestionDroitPage', () => {
  let component: GestionDroitPage;
  let fixture: ComponentFixture<GestionDroitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDroitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionDroitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
