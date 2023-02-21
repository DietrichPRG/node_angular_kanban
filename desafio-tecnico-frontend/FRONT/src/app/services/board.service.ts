import { Injectable } from '@angular/core';
import { ITodoCard } from '../board/model/ITodoCard';
import { ApiClientService } from './api-client.service';

const url = '/cards';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private client: ApiClientService) { }

  cadastrar = async (data : ITodoCard) : Promise<ITodoCard> => {
    return await this.client.post<ITodoCard>(url, data);
  }

  atualizar = async (data : ITodoCard) : Promise<ITodoCard> => {
    return await this.client.put<ITodoCard>(url, data.id, data);
  }

  excluir = async (id : string) : Promise<ITodoCard[]> => {
    return await this.client.delete<ITodoCard[]>(url, id);
  }

  listar = async () : Promise<ITodoCard[]> => {
    return await this.client.get<ITodoCard[]>(url);
  }
  
}
