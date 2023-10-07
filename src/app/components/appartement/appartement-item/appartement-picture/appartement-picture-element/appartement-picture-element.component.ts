import {Component, Input} from '@angular/core';
import {NavigationService} from "../../../../../services/navigation.service";
import {Router} from "@angular/router";
import {Appartement} from "../../../../../models/gestion";

@Component({
  selector: 'app-appartement-picture-element',
  templateUrl: './appartement-picture-element.component.html',
  styleUrls: ['./appartement-picture-element.component.scss']
})
export class AppartementPictureElementComponent {
  @Input() appartement: Appartement | null = null;
  constructor(private navigationService: NavigationService, private router: Router) { }

  onModifyClick() {
    this.navigationService.setData(this.appartement);
    this.router.navigate(['/appartement/', this.appartement.id, 'photos']);
  }
}
