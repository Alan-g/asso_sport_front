import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RechercheAdherentPage } from './recherche-adherent.page';

describe('RechercheAdherentPage', () => {
  let component: RechercheAdherentPage;
  let fixture: ComponentFixture<RechercheAdherentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheAdherentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheAdherentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
