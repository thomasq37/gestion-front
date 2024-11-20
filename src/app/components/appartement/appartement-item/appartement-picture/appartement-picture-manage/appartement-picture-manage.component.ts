import { Component } from '@angular/core';

@Component({
  selector: 'app-appartement-picture-manage',
  templateUrl: './appartement-picture-manage.component.html',
  styleUrls: ['./appartement-picture-manage.component.scss']
})
export class AppartementPictureManageComponent {
  isLoad: boolean;

  handlePicturesIsLoad(isLoad: boolean) {
    this.isLoad = isLoad
    console.log(this.isLoad)
  }
}
