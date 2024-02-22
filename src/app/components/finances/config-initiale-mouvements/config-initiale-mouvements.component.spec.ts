import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigInitialeMouvementsComponent } from './config-initiale-mouvements.component';

describe('ConfigInitialeMouvementsComponent', () => {
  let component: ConfigInitialeMouvementsComponent;
  let fixture: ComponentFixture<ConfigInitialeMouvementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigInitialeMouvementsComponent]
    });
    fixture = TestBed.createComponent(ConfigInitialeMouvementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
