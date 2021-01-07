import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscriptionUpdatePage } from './inscription-update.page';

describe('InscriptionUpdatePage', () => {
  let component: InscriptionUpdatePage;
  let fixture: ComponentFixture<InscriptionUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscriptionUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
