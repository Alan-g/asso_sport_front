import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypeCoursPage } from './type-cours.page';

describe('TypeCoursPage', () => {
  let component: TypeCoursPage;
  let fixture: ComponentFixture<TypeCoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCoursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypeCoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
