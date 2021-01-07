import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RechercheInscriptionPage } from './recherche-inscription.page';

describe('RechercheInscriptionPage', () => {
  let component: RechercheInscriptionPage;
  let fixture: ComponentFixture<RechercheInscriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheInscriptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheInscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
