import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import loginModel, { Login } from '../model/login.model';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';
import { excludedFields } from '../controllers/auth.controller';

export const createLogin = async (input: Partial<Login>) => {
  const login = await loginModel.create(input);
  return omit(login.toJSON(), excludedFields);
};

export const findLoginById = async (id: string) => {
  const login = await loginModel.findById(id).lean();
  return omit(login, excludedFields);
};

export const findAllLogins = async () => {
  return await loginModel.find();
};

export const findLogin = async (
  query: FilterQuery<Login>,
  options: QueryOptions = {}
) => {
  return await loginModel.findOne(query, {}, options).select('+senha');
};

export const signToken = async (login: DocumentType<Login>) => {
  const access_token = signJwt(
    { sub: login._id },
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );

  try
  {
    await redisClient.set(`${login._id}`, `${JSON.stringify(login)}`, {EX : config.get<number>('accessTokenExpiresIn') * 60});
  } catch (error: any) {
    console.log(error.message);
  }

  // Return access token
  return { access_token };
};

