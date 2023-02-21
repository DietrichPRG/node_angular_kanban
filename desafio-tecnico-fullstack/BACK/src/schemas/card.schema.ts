import { object, string, TypeOf } from 'zod';

export const cardSchema = object({
    body: object({
        titulo: string({ required_error: 'Titulo é obrigatório' }).min(
        1,
        'Titulo deve conter no mínimo 1 caracter'
      ),
      conteudo: string({ required_error: 'Conteudo é obrigatório' }).min(
        1,
        'Conteudo deve conter no mínimo 1 caracter'
      ),
      lista: string({ required_error: 'Lista é obrigatório' }).min(
        1,
        'Lista deve conter no mínimo 1 caracter'
      ),
      id: string().optional(),
    }),
  });
  
  export type CardInput = TypeOf<typeof cardSchema>['body'];