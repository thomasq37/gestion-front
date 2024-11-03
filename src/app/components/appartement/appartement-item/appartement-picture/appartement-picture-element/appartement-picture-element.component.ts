import { AfterViewInit, Component, HostListener, Input, ElementRef, TemplateRef } from '@angular/core';
import { NavigationService } from "../../../../../services/navigation.service";
import { Router } from "@angular/router";
import { Appartement } from "../../../../../models/gestion";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appartement-picture-element',
  templateUrl: './appartement-picture-element.component.html',
  styleUrls: ['./appartement-picture-element.component.scss']
})
export class AppartementPictureElementComponent implements AfterViewInit {
  @Input() appartement: Appartement | null = null;
  selectedImage: string | null = null;

  constructor(
    private navigationService: NavigationService,
    private router: Router,
    private elementRef: ElementRef,
    private modalService: NgbModal // Added NgbModal for modal handling
  ) { }

  ngAfterViewInit(): void {
    this.adjustImageHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.adjustImageHeight();
  }

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

  onModifyClick(): void {
    if (this.appartement) {
      this.navigationService.setData(this.appartement);
      this.router.navigate(['/appartement/', this.appartement.id, 'photos']);
    }
  }

  onImageClick(image: string, modalTemplate: TemplateRef<any>): void {
    this.selectedImage = image;
    this.modalService.open(modalTemplate, {
      size: 'xl', // Use 'xl' for a larger modal
      centered: true,
      windowClass: 'full-screen-modal' // Add a custom class for additional styling
    });
  }
}
