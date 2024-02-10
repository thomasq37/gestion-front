import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementUpdateComponent } from './mouvement-update.component';

describe('MouvementUpdateComponent', () => {
  let component: MouvementUpdateComponent;
  let fixture: ComponentFixture<MouvementUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MouvementUpdateComponent]
    });
    fixture = TestBed.createComponent(MouvementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
