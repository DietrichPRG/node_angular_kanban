import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';

const url = '/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: ApiClientService) { }

  login = async (login: string, senha: string) : Promise<boolean> => {

    const token = await this.client.post<string>(url, {
      login: login,
      senha: senha
    });

    if (token.trim() === '') {
      return false;
    }

    localStorage.setItem('token', token);

    return true;
  }
}
