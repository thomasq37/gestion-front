// navigation.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private confirmNavigationSubject = new Subject<void>();
  confirmNavigation$ = this.confirmNavigationSubject.asObservable();

  sendNavigationConfirmation() {
    this.confirmNavigationSubject.next(); // Émet le résultat de confirmation (true ou false)
  }
}
