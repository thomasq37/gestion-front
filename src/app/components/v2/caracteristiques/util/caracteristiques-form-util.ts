import { FormGroup } from '@angular/forms';

export class CaracteristiquesFormUtil {

  static auChargementDuFichier(event: Event, form: FormGroup, formControlName: string): string | null {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64StringWithPrefix = reader.result as string;
        const base64String = base64StringWithPrefix.split(',')[1];
        form.patchValue({
          [formControlName]: base64String
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
}
