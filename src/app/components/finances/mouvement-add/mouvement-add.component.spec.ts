import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementAddComponent } from './mouvement-add.component';

describe('MouvementAddComponent', () => {
  let component: MouvementAddComponent;
  let fixture: ComponentFixture<MouvementAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MouvementAddComponent]
    });
    fixture = TestBed.createComponent(MouvementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
