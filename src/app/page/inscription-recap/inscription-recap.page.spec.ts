import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscriptionRecapPage } from './inscription-recap.page';

describe('InscriptionRecapPage', () => {
  let component: InscriptionRecapPage;
  let fixture: ComponentFixture<InscriptionRecapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionRecapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionRecapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
