import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Inscription3Page } from './inscription3.page';

describe('Inscription3Page', () => {
  let component: Inscription3Page;
  let fixture: ComponentFixture<Inscription3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Inscription3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
