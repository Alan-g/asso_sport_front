import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionRolePage } from './gestion-role.page';

describe('GestionRolePage', () => {
  let component: GestionRolePage;
  let fixture: ComponentFixture<GestionRolePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionRolePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionRolePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
