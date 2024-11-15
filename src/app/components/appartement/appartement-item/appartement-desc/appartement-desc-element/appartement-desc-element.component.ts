import {Component, Input} from '@angular/core';
import {Appartement} from "../../../../../models/gestion";
import {Router} from "@angular/router";
import {hasProprietaireRole} from "../../../../../services/http-helpers";
@Component({
  selector: 'app-appartement-desc-element',
  templateUrl: './appartement-desc-element.component.html',
  styleUrls: ['./appartement-desc-element.component.scss']
})
export class AppartementDescElementComponent {
  @Input() appartement: Appartement | null = null;
  constructor(private router: Router) { }

  onModifyClick() {
    this.router.navigate(['/appartement/', this.appartement.id, 'description']);
  }

  protected readonly hasProprietaireRole = hasProprietaireRole;
}
