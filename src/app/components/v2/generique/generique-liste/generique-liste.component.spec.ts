import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneriqueListeComponent } from './generique-liste.component';

describe('GeneriqueListeComponent', () => {
  let component: GeneriqueListeComponent;
  let fixture: ComponentFixture<GeneriqueListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneriqueListeComponent]
    });
    fixture = TestBed.createComponent(GeneriqueListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
