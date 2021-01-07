import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalleComponent } from './salle.component';

describe('SalleComponent', () => {
  let component: SalleComponent;
  let fixture: ComponentFixture<SalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
