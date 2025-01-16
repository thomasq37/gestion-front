import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PhotoDTO} from "../../../../models/v2/entites/Photo/PhotoDTO.model";
import {NgbCarousel, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-photo-caroussel',
  templateUrl: './photo-caroussel.component.html',
  styleUrls: ['./photo-caroussel.component.scss']
})
export class PhotoCarousselComponent implements OnInit {
  @Input() photos!: PhotoDTO[];
  @Input() onItem!: boolean;
  @Input() logementId!: string;
  @ViewChild('carousel', { static: false }) carousel: NgbCarousel | undefined;
  selectedImage: string | null = null;
  rightSidePhotos: PhotoDTO[] = [];
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private touchStartY: number = 0;
  private isClick: boolean = true;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    if(this.photos.length === 0){
      this.http
        .get('assets/ressources/no-image.txt', { responseType: 'text' })
        .subscribe((data: string) => {
          for(let i = 0; i < 3; i++){
            this.photos.push({
              isPrincipal:false,
              image: data
            });
          }
        });
    }
    this.sortPhotosByIsPrincipal();
    this.setRightSidePhotos();
  }

  setRightSidePhotos(): void {
    if (this.photos.length > 1) {
      this.rightSidePhotos = this.photos.slice(1, 3);
    } else if (this.photos.length === 1) {
      this.rightSidePhotos = [this.photos[0]];
    } else {
      this.rightSidePhotos = [];
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
    this.touchStartY = event.touches[0].clientY; // Ajoutez pour capturer la position Y
    this.isClick = true;
  }

  onTouchMove(event: TouchEvent): void {
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const diffX = Math.abs(this.touchStartX - currentX);
    const diffY = Math.abs(this.touchStartY - currentY);

    // Vérifiez si le mouvement est horizontal
    if (diffX > diffY && diffX > 10) {
      this.isClick = false;
      event.preventDefault(); // Empêche le défilement de l'écran
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
    this.router.navigate([`/logements/${this.logementId}/photos/modifier`]);
  }

  naviguerALogement() {
    this.router.navigate(['/logements', this.logementId]);
  }
}
