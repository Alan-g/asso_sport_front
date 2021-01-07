import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdherentPage } from './adherent.page';

describe('AdherentPage', () => {
  let component: AdherentPage;
  let fixture: ComponentFixture<AdherentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdherentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdherentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
