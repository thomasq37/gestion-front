import { AfterViewInit, Component, HostListener, Input, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Appartement } from "../../../../../models/gestion";
import { NgbModal, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appartement-picture-element',
  templateUrl: './appartement-picture-element.component.html',
  styleUrls: ['./appartement-picture-element.component.scss']
})
export class AppartementPictureElementComponent implements AfterViewInit {
  @Input() appartement: Appartement | null = null;
  selectedImage: string | null = null;

  @ViewChild('carousel', { static: false }) carousel: NgbCarousel | undefined;

  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private isClick: boolean = true;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private modalService: NgbModal
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
      this.router.navigate(['/appartement/', this.appartement.id, 'photos']);
    }
  }

  onImageClick(image: string, modalTemplate: TemplateRef<any>): void {
    if (this.isClick) {
      // Ouvrir la modale seulement si c'est un clic
      this.selectedImage = image;
      this.modalService.open(modalTemplate, {
        size: 'xl',
        centered: true,
        windowClass: 'full-screen-modal'
      });
    }
  }

  // Methods for handling swipe gestures
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.isClick = true; // Initialiser comme un clic
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.touches[0].clientX;

    // Si un mouvement significatif est détecté, ce n'est pas un clic
    if (Math.abs(this.touchStartX - this.touchEndX) > 10) {
      this.isClick = false;
    }
  }

  onTouchEnd(): void {
    if (!this.isClick && this.carousel) {
      // Déclencher le swipe seulement si ce n'était pas un clic
      if (this.touchStartX - this.touchEndX > 50) {
        // Swipe left
        this.carousel.next();
      }
      if (this.touchEndX - this.touchStartX > 50) {
        // Swipe right
        this.carousel.prev();
      }
    }
  }
}
