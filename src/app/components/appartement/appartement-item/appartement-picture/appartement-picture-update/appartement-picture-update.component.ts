import {Component, OnInit} from '@angular/core';
import { NavigationService } from "../../../../../services/navigation.service";
import { FormArray, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import {Appartement} from "../../../../../models/gestion";
import {GestionService} from "../../../../../services/gestion.service";
import {Router} from "@angular/router";
import {S3Service} from "../../../../../services/s3.service";

@Component({
  selector: 'app-appartement-picture-update',
  templateUrl: './appartement-picture-update.component.html',
  styleUrls: ['./appartement-picture-update.component.scss']
})
export class AppartementPictureUpdateComponent implements OnInit{
  /*appartement: Appartement = <Appartement>{};
  public pictureUpdateForm: FormGroup;

  constructor(
    private router: Router,
    private gestionService : GestionService,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService
  ) {
    this.appartement = this.navigationService.getData();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const imageUrls = this.appartement.images || [];
    const imagesFormArray = new FormArray(
      imageUrls.map(url => new FormControl(url))
    );

    this.pictureUpdateForm = this.formBuilder.group({
      images: imagesFormArray
    });
  }

  get imagesFormArray(): FormArray {
    return this.pictureUpdateForm.get('images') as FormArray;
  }

  addImage(): void {
    this.imagesFormArray.push(new FormControl(''));
  }

  removeImage(index: number): void {
    this.imagesFormArray.removeAt(index);
  }
  getFormControl(index: number): FormControl {
    return this.imagesFormArray.at(index) as FormControl;
  }

  mettreAJourUnAppartementPourUtilisateur() {
    const userId = parseInt(<string>localStorage.getItem('userId'))
    this.appartement = { ...this.appartement, ...this.pictureUpdateForm.value };
    this.gestionService.mettreAJourUnAppartementPourUtilisateur(userId, this.appartement.id, this.appartement).subscribe(appartement =>{
        console.log('Appartement mis à jour avec succès.');
        this.router.navigate(['/appartement/' + this.appartement.id]);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'appartement :', error);
      });
  }*/
  appartement: Appartement = <Appartement>{};
  public pictureUpdateForm: FormGroup;

  constructor(
    private router: Router,
    private gestionService: GestionService,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private s3Service: S3Service // Injecte le service S3
  ) {
    this.appartement = this.navigationService.getData();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const imageUrls = this.appartement.images || [];
    const imagesFormArray = new FormArray(
      imageUrls.map(url => new FormControl(url))
    );

    this.pictureUpdateForm = this.formBuilder.group({
      images: imagesFormArray
    });
  }

  get imagesFormArray(): FormArray {
    return this.pictureUpdateForm.get('images') as FormArray;
  }

  addImage(): void {
    this.imagesFormArray.push(new FormControl(''));
  }

  removeImage(index: number): void {
    this.imagesFormArray.removeAt(index);
  }

  getFormControl(index: number): FormControl {
    return this.imagesFormArray.at(index) as FormControl;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.s3Service.uploadImage(file).subscribe(
        (url: string) => {
          // Ajoute l'URL de l'image au formulaire
          this.imagesFormArray.push(new FormControl(url));
        },
        (error) => {
          console.error('Erreur lors du téléchargement de l\'image :', error);
        }
      );
    }
  }

  mettreAJourUnAppartementPourUtilisateur() {
    const userId = parseInt(<string>localStorage.getItem('userId'));
    this.appartement = { ...this.appartement, ...this.pictureUpdateForm.value };
    this.gestionService.mettreAJourUnAppartementPourUtilisateur(userId, this.appartement.id, this.appartement).subscribe(
      appartement => {
        console.log('Appartement mis à jour avec succès.');
        this.router.navigate(['/appartement/' + this.appartement.id]);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'appartement :', error);
      }
    );
  }
}
