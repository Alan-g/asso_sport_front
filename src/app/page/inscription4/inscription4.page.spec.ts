import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Inscription4Page } from './inscription4.page';

describe('Inscription4Page', () => {
  let component: Inscription4Page;
  let fixture: ComponentFixture<Inscription4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Inscription4Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
