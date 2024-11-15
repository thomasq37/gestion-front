import {Component, OnDestroy, OnInit} from '@angular/core';
import {Appartement, Pays} from "../../../../../models/gestion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GestionService} from "../../../../../services/gestion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {S3Service} from "../../../../../services/s3.service";
import {Subscription} from "rxjs";
import {NavigationService} from "../../../../../services/navigation.service";

@Component({
  selector: 'app-appartement-desc-update',
  templateUrl: './appartement-desc-update.component.html',
  styleUrls: ['./appartement-desc-update.component.scss']
})
export class AppartementDescUpdateComponent implements OnInit, OnDestroy {
  appartement: Appartement;
  appartementForm: FormGroup;
  paysList: Pays[] = [];
  dpeLetterList: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Non renseigné'];
  dpeFileIsLoading: boolean = false;
  listFilesToManage: {file: Blob|null, url: string, status: string}[] = []
  navigationSubscription: Subscription;
  initialFormValues: any;
  constructor(
    private formBuilder: FormBuilder,
    private gestionService: GestionService,
    private router: Router,
    private route: ActivatedRoute,
    private s3Service: S3Service,
    private navigationService: NavigationService,
  ) {
    this.appartement = <Appartement>{};
    this.appartementForm = this.formBuilder.group({
      dateAchat: ['', Validators.required],
      numero: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      nombrePieces: ['', Validators.required],
      surface: ['', Validators.required],
      prix: ['', Validators.required],
      fraisNotaireEtNegociation: ['', Validators.required],
      estimation: [''],
      dpe: ['', Validators.required],
      lastDPEUrl: [''],
      balcon: [''],
    });
  }
  // efectuer action ici
  showConfirmationDialog = false;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gestionService.obtenirAppartmentParUtilisateurIdEtAppartementId(+params['id']).then(appartement => {
        this.appartement = appartement;
        this.initAppartementForm(appartement);
        this.gestionService.obtenirListePays().then(data => {
          this.paysList = data;
        });
      });
    });

    this.appartementForm.valueChanges.subscribe(() => {
      if (!this.initialFormValues) {
        this.initialFormValues = this.appartementForm.getRawValue();
      }
    });

    this.navigationSubscription = this.navigationService.confirmNavigation$.subscribe(() => {
      this.showConfirmationDialog = this.hasFormChanged()
      if(!this.hasFormChanged()){
        this.router.navigate(['/appartement/' + this.appartement.id]); // Navigation sans enregistrement
      }
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from navigationSubscription to prevent memory leaks
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  initAppartementForm(appartement: Appartement) {
    this.appartementForm.patchValue({
      dateAchat: appartement.dateAchat,
      numero: appartement.numero,
      adresse: appartement.adresse,
      codePostal: appartement.codePostal,
      ville: appartement.ville,
      pays: appartement.pays.name,
      nombrePieces: appartement.nombrePieces,
      surface: appartement.surface,
      prix: appartement.prix,
      fraisNotaireEtNegociation:appartement.fraisNotaireEtNegociation,
      estimation: appartement.estimation,
      dpe: appartement.dpe,
      lastDPEUrl: appartement.lastDPEUrl,
      balcon: appartement.balcon,
    });
    this.initialFormValues = this.appartementForm.getRawValue();
  }
  hasFormChanged(): boolean {
    // Compare current values with initial values
    return JSON.stringify(this.appartementForm.getRawValue()) !== JSON.stringify(this.initialFormValues);
  }
  onDpeFileSelected(event: any): void {
    this.dpeFileIsLoading = true;
    const file = event.target.files[0];
    if (file) {
      this.s3Service.uploadFile(file).subscribe(
        (url: string) => {
          this.dpeFileIsLoading = false;
          this.appartementForm.patchValue({ lastDPEUrl: url });
          this.listFilesToManage.push({file: null, url: url, status: "temporaire" })
          this.appartement.lastDPEUrl = url;
          console.log('Téléchargement du fichier DPE éffectué avec succés.');
        },
        (error) => {
          this.dpeFileIsLoading = false;
          console.error('Erreur lors du téléchargement du fichier DPE :', error);
        }
      );
    }
  }

  onDeleteDpeFile(): void {
    this.dpeFileIsLoading = true
    const dpeUrl = this.appartement.lastDPEUrl;
    const key = dpeUrl.split('.amazonaws.com/images/')[1]; // Adjust this split point based on your S3 URL structure
    if (key) {
      this.s3Service.getFile(key).subscribe(
        (fileBlob: Blob) => {
          const file = new File([fileBlob], key, { type: fileBlob.type });
          this.s3Service.deleteFile(key).subscribe(
            () => {
              this.appartementForm.patchValue({lastDPEUrl: null});
              this.appartement.lastDPEUrl = null;
              if(this.listFilesToManage.length === 0){
                this.listFilesToManage.push({file: file, url: dpeUrl, status: "origine" })
              }
              else{
                this.listFilesToManage.pop()
              }
              this.dpeFileIsLoading = false;
              console.log('Fichier DPE supprimé avec succès.');
            },
            (error) => {
              this.dpeFileIsLoading = false;
              console.error('Erreur lors de la suppression du fichier DPE :', error);
            }
          );
        },(error) => {
        this.dpeFileIsLoading = false;
        this.appartement.lastDPEUrl = null;
        this.appartementForm.patchValue({lastDPEUrl: null});
        console.error('Erreur lors de la recuperation du fichier DPE :', error);
      })
    }
    else {
      this.dpeFileIsLoading = false;
      console.error('Clé du fichier DPE non valide. Suppression annulée.');
    }
  }

  mettreAJourUnAppartementPourUtilisateur() {
    const updatedAppartementData = this.appartementForm.value;
    updatedAppartementData.pays = this.paysList.find(p => p.name === updatedAppartementData.pays);
    this.appartement = { ...this.appartement, ...updatedAppartementData };
    this.gestionService.mettreAJourUnAppartementPourUtilisateur(this.appartement.id, this.appartement)
      .then(
        appartement => {
          console.log('Appartement mis à jour avec succès.');
          this.router.navigate(['/appartement/' + this.appartement.id]);
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'appartement :', error);
        }
      );
  }

  onDialogConfirm($event: boolean) {
    if ($event) {
      console.log("mettre a jour et naviguer")
      this.mettreAJourUnAppartementPourUtilisateur();
    } else {
      this.revertFilesOnCancel()
      this.router.navigate(['/appartement/' + this.appartement.id]); // Navigation sans enregistrement
    }
  }

  revertFilesOnCancel(){
    this.listFilesToManage.forEach(file => {
      const key = file.url.split('.amazonaws.com/images/')[1];
      if(file.status === "origine"){
        const fileContent = new File([file.file], key, { type: file.file.type });
        this.s3Service.uploadFile(fileContent).subscribe(
          (url: string) => {
            console.log('Téléchargement du fichier DPE éffectué avec succés.');
          },
          (error) => {
            this.dpeFileIsLoading = false;
            console.error('Erreur lors du téléchargement du fichier DPE :', error);
          }
        );
      }
      else if(file.status === "temporaire"){
        this.s3Service.deleteFile(key).subscribe(
          () => {
            console.log('Fichier DPE supprimé avec succès.');
          },
          (error) => {
            console.error('Erreur lors de la suppression du fichier DPE :', error);
          }
        );
      }
    })
  }
}
