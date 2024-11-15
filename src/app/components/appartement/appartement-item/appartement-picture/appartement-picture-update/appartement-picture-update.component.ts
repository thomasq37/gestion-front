import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import {Appartement} from "../../../../../models/gestion";
import {GestionService} from "../../../../../services/gestion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {S3Service} from "../../../../../services/s3.service";

@Component({
  selector: 'app-appartement-picture-update',
  templateUrl: './appartement-picture-update.component.html',
  styleUrls: ['./appartement-picture-update.component.scss']
})
export class AppartementPictureUpdateComponent implements OnInit{
  appartement: Appartement = <Appartement>{};
  public pictureUpdateForm: FormGroup;
  imgIsLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gestionService: GestionService,
    private formBuilder: FormBuilder,
    private s3Service: S3Service // Injecte le service S3
  ) {
    //this.appartement = this.navigationService.getData();
  }

  ngOnInit(): void {
    const appartementId = this.route.snapshot.paramMap.get('id');
    if (appartementId) {
      this.gestionService.obtenirAppartmentParUtilisateurIdEtAppartementId(parseInt(appartementId)).then(
        (appartement: Appartement) => {
          this.appartement = appartement;
          this.initForm();
        },
        (error) => {
          console.error('Erreur lors du chargement de l\'appartement :', error);
        }
      );
    } else {
      console.error('ID de l\'appartement non trouvé.');
    }
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
  removeImage(index: number): void {
    const imageUrl = this.imagesFormArray.at(index).value;
    const key = imageUrl.split('.amazonaws.com/images/')[1];
    if (key) {
      this.s3Service.deleteFile(key).subscribe(
        () => {
          this.imagesFormArray.removeAt(index);
          console.log('Image supprimée avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'image :', error);
        }
      );
    } else {
      console.error('Clé de l\'image non valide. Suppression annulée.');
    }
  }

  getFormControl(index: number): FormControl {
    return this.imagesFormArray.at(index) as FormControl;
  }

  onFileSelected(event: any): void {
    this.imgIsLoading = true;
    const file = event.target.files[0];
    if (file) {
      this.s3Service.uploadFile(file).subscribe(
        (url: string) => {
          this.imgIsLoading = false
          this.imagesFormArray.push(new FormControl(url));
        },
        (error) => {
          this.imgIsLoading = false
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
