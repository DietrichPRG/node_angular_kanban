import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { LoginInput } from '../schemas/login.schema';
import { createLogin, findLogin, signToken } from '../services/login.service';
import AppError from '../utils/errors';

// Exclude this fields from the response
export const excludedFields = ['password'];

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
};

export const loginHandler = async (
    req: Request<{}, {}, LoginInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get the login from the collection
        let login = await findLogin({ login: req.body.login, senha: req.body.senha });

        if(login == null)
        {
            await createLogin(req.body);
            login = await findLogin({ login: req.body.login, senha: req.body.senha });
        }

        if (
            !login ||
            !(await login.compareSenhas(login.senha, req.body.senha))
        ) {
            return next(new AppError('Invalid email or password', 401));
        }

        const accessToken = await signToken(login);

        // Send Access Token in Cookie
        res.cookie('accessToken', accessToken, accessTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });

        // Send Access Token
        res.status(200).send(`"${accessToken.access_token}"`);
    } catch (err: any) {
        next(err);
    }
};

