import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
})
export class DateInputComponent {
  estEntree = new FormControl('');

  // Fonction pour afficher la date au format JJ/MM/AAAA
  formatDate(control: FormControl): string {
    const value = control.value;
    if (value) {
      const [year, month, day] = value.split('-');
      return `${day}/${month}/${year}`; // Affichage format JJ/MM/AAAA
    }
    return '';
  }

  // Au focus, on change le type en "date" pour afficher le sélecteur
  onFocus(control: FormControl) {
    control.setValue(this.convertToISO(control.value)); // Valeur ISO pour le sélecteur
  }

  // Lors du mouseover, on change aussi le type en "date"
  onMouseOver(control: FormControl) {
    control.setValue(this.convertToISO(control.value)); // Valeur ISO pour le sélecteur
  }

  // Au blur, on reformate la date pour l'affichage
  onBlur(control: FormControl) {
    control.setValue(this.formatDate(control));
  }

  // Convertit la date JJ/MM/AAAA en format ISO (YYYY-MM-DD)
  private convertToISO(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  }
}
