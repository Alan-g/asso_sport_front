import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionSallePage } from './gestion-salle.page';

describe('GestionSallePage', () => {
  let component: GestionSallePage;
  let fixture: ComponentFixture<GestionSallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionSallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
