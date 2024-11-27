import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {RegisterUserRequestDTO} from "../../models/v2/auth/RegisterUserRequestDTO.model";
import {SuccessResponse} from "../../models/v2/exception/SuccessResponse.model";
import {ErrorResponse} from "../../models/v2/exception/ErrorResponse.model";
import {fetchWithHandling} from "../http-helpers";
import {AuthenticateUserRequestDTO} from "../../models/v2/auth/AuthenticateUserRequestDTO.model";
@Injectable({
  providedIn: 'root'
})
export class AuthentService {

  private apiUrl = `${environment.apiUrl}/auth`;

  async registerUser(registerUserRequestDTO: RegisterUserRequestDTO): Promise<SuccessResponse | ErrorResponse> {
    return fetchWithHandling<SuccessResponse | ErrorResponse>(`${this.apiUrl}/inscription`, {
      method: 'POST',
      body: JSON.stringify(registerUserRequestDTO),
    });
  }

  async authenticateUser(authenticateUserRequestDTO: AuthenticateUserRequestDTO): Promise<string> {
    return fetchWithHandling<string>(`${this.apiUrl}/connexion`, {
      method: 'POST',
      body: JSON.stringify(authenticateUserRequestDTO),
    });
  }
}
