import { FormGroup } from '@angular/forms';

export class CaracteristiquesFormUtil {

  static auChargementDuFichier(event: Event, form: FormGroup, formControlName: string): string | null {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64StringWithPrefix = reader.result as string;
        form.patchValue({
          [formControlName]: base64StringWithPrefix
        });
      };
      reader.onerror = (error) => {
        console.error('Erreur lors de la conversion du fichier en Base64:', error);
      };

      reader.readAsDataURL(file);
      return file.name;
    }
    return null;
  }

  static remplacerFichier(form: FormGroup, formControlName: string): void {
    form.patchValue({ [formControlName]: '' });
  }

  static onBalconOuTerrasseChange(event: Event, form: FormGroup, surfaceControlName: string): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'false') {
      form.get(surfaceControlName)?.setValue(0);
    }
  }

  static telechargerFichier(base64Document: string, nomFichier: string) {
    // Vérifiez que le fichier est bien encodé en base64
    if (!base64Document.startsWith('data:')) {
      console.error('Le fichier n\'est pas au format Base64 valide.');
      return;
    }

    // Crée un Blob à partir du contenu Base64
    const base64Data = base64Document.split(',')[1];
    const contentType = base64Document.split(';')[0].split(':')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    const a = window.document.createElement('a');
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "DPE " + nomFichier;
    a.click();
    URL.revokeObjectURL(url);
  }


}
