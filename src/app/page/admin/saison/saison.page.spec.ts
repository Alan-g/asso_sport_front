import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaisonPage } from './saison.page';

describe('SaisonPage', () => {
  let component: SaisonPage;
  let fixture: ComponentFixture<SaisonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
