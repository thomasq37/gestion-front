import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationGlobaleComponent } from './navigation-globale.component';

describe('NavigationGlobaleComponent', () => {
  let component: NavigationGlobaleComponent;
  let fixture: ComponentFixture<NavigationGlobaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationGlobaleComponent]
    });
    fixture = TestBed.createComponent(NavigationGlobaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
