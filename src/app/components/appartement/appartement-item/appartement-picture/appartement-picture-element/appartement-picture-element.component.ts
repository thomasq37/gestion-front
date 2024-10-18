import {AfterViewInit, Component, HostListener, Input, ElementRef} from '@angular/core';
import {NavigationService} from "../../../../../services/navigation.service";
import {Router} from "@angular/router";
import {Appartement} from "../../../../../models/gestion";

@Component({
  selector: 'app-appartement-picture-element',
  templateUrl: './appartement-picture-element.component.html',
  styleUrls: ['./appartement-picture-element.component.scss']
})
export class AppartementPictureElementComponent implements AfterViewInit {
  @Input() appartement: Appartement | null = null;
  constructor(private navigationService: NavigationService, private router: Router, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.adjustImageHeight();
  }

  // Adjust image height when window is resized
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustImageHeight();
  }

  // Function to adjust the height of the images dynamically
  adjustImageHeight(): void {
    const carouselElement = this.elementRef.nativeElement.querySelector('ngb-carousel');
    const imageWrapperElements = this.elementRef.nativeElement.querySelectorAll('.picsum-img-wrapper');

    if (carouselElement) {
      const carouselHeight = carouselElement.offsetHeight;
      imageWrapperElements.forEach((wrapper: any) => {
        wrapper.style.height = `${carouselHeight}px`;
      });
    }
  }
  isProprietaire(): boolean {
    return localStorage.getItem('userRole') === "PROPRIETAIRE";
  }
  onModifyClick() {
    this.navigationService.setData(this.appartement);
    this.router.navigate(['/appartement/', this.appartement.id, 'photos']);
  }
}
