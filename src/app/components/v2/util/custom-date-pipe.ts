import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {
  transform(value: string | null): string {
    if(value === null){
      return "Pas de sortie"
    }
    const date = new Date(value);
    const monthNames = [
      "jan", "fév", "mar", "avr", "mai", "juin",
      "juil", "août", "sept", "oct", "nov", "déc"
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
}
