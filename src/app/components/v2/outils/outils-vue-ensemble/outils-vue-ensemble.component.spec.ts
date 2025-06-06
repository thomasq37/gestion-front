import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilsVueEnsembleComponent } from './outils-vue-ensemble.component';

describe('OutilsVueEnsembleComponent', () => {
  let component: OutilsVueEnsembleComponent;
  let fixture: ComponentFixture<OutilsVueEnsembleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutilsVueEnsembleComponent]
    });
    fixture = TestBed.createComponent(OutilsVueEnsembleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
