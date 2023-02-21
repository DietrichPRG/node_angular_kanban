import { object, string, TypeOf } from 'zod';

export const loginSchema = object({
    body: object({
      login: string({ required_error: 'login is required' }).min(
        8,
        'Invalid email or password'
      ),
      senha: string({ required_error: 'senha is required' }).min(
        8,
        'Invalid email or senha'
      ),
    }),
  });
  
  export type LoginInput = TypeOf<typeof loginSchema>['body'];