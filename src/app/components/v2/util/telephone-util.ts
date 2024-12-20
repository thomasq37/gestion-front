import {parsePhoneNumberFromString} from 'libphonenumber-js';
import {CountryISO} from "ngx-intl-tel-input-gg";

export class TelephoneUtil {
  static obtenirCountryISO(telephoneNumero: string): CountryISO | null {
    if(!telephoneNumero) {
      return CountryISO.France
    }
    const telephoneData = parsePhoneNumberFromString(telephoneNumero);
    if (telephoneData && telephoneData.country) {
      return telephoneData.country as CountryISO;
    } else {
      console.error('Impossible de déterminer le pays à partir du numéro');
      return null;
    }
  }
}
