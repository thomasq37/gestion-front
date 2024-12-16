import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PhotoDTO} from "../../../../models/v2/entites/Photo/PhotoDTO.model";
import {NgbCarousel, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
@Component({
  selector: 'app-photo-caroussel',
  templateUrl: './photo-caroussel.component.html',
  styleUrls: ['./photo-caroussel.component.scss']
})
export class PhotoCarousselComponent implements OnInit {
  @Input() photos!: PhotoDTO[];
  @Input() onItem!: boolean;
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel | undefined;
  selectedImage: string | null = null;
  rightSidePhotos: PhotoDTO[] = [];
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private isClick: boolean = true;
  @Input() logementId!: string;

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.sortPhotosByIsPrincipal();
    this.setRightSidePhotos();
  }

  setRightSidePhotos(): void {
    if (this.photos.length > 2) {
      this.rightSidePhotos = [this.photos[1], this.photos[2]];
    }
  }
  sortPhotosByIsPrincipal(): void {
    if (this.photos) {
      this.photos.sort((a, b) => {
        return (b.isPrincipal ? 1 : 0) - (a.isPrincipal ? 1 : 0);
      });
    }
  }
  onImageClick(image: string, modalTemplate: TemplateRef<any>): void {
    if (this.isClick) {
      this.selectedImage = image;
      this.modalService.open(modalTemplate, {
        size: 'xl',
        centered: true,
        windowClass: 'full-screen-modal'
      });
    }
  }
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.isClick = true;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEndX = event.touches[0].clientX;
    if (Math.abs(this.touchStartX - this.touchEndX) > 10) {
      this.isClick = false;
    }
  }

  onTouchEnd(): void {
    if (!this.isClick && this.carousel) {
      if (this.touchStartX - this.touchEndX > 50) {
        this.carousel.next();
      }
      if (this.touchEndX - this.touchStartX > 50) {
        this.carousel.prev();
      }
    }
  }
  modifierPhotos() {

  }

  naviguerALogement() {
    this.router.navigate(['/logements', this.logementId]);
  }
}
