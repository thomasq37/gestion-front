import {Component, Input} from '@angular/core';
import {Appartement} from "../../../../../models/gestion";
import {Router} from "@angular/router";
import {NavigationService} from "../../../../../services/navigation.service";

@Component({
  selector: 'app-appartement-desc-element',
  templateUrl: './appartement-desc-element.component.html',
  styleUrls: ['./appartement-desc-element.component.scss']
})
export class AppartementDescElementComponent {
  @Input() appartement: Appartement | null = null;
  isProprietaire(): boolean {
    return localStorage.getItem('userRole') === "PROPRIETAIRE";
  }
  constructor(private navigationService: NavigationService, private router: Router) { }

  onModifyClick() {
    this.navigationService.setData(this.appartement);
    this.router.navigate(['/appartement/', this.appartement.id, 'description']);
  }
}
