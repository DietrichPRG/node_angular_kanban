import { createCard, deleteCard, findAllCards, updateCard } from '../services/card.service';
import {Request, Response} from 'express';
import { CardInput } from '../schemas/card.schema';

export const getAllCardsHandler = async (req: Request, res: Response) => {
    try {
        const cards = await findAllCards();
        res.status(200).json(cards);
    }
    catch (err: any) {
    }
};

export const insertCardHandler = async (
    req: Request<{}, {}, CardInput>,
    res: Response
    ) => {
    try {
        const card = await createCard(req.body);
        res.status(201).json(card);
    }
    catch (err: any) {
        res.status(400).json(err);
    }
};

export const updateCardHandler = async (
    req: Request<{id : string}, {}, CardInput>,
    res: Response
    ) => {
    try {
        const id = req.params.id;
        if(req.body?.id !== id)
        {
            res.status(400).json({message: 'Id do corpo da requisição não é igual ao id do parâmetro'});
            return;
        }

        const card = await updateCard(id, req.body);
        res.status(200).json(card);
    }
    catch (err: any) {
        res.status(400).json(err);
    }
};

export const deleteCardHandler = async (
    req: Request,
    res: Response
    ) => {
    try {
        const id = req.params.id;

        const cards = await deleteCard(id);
        res.status(200).json(cards);
    }
    catch (err: any) {
        res.status(400).json(err);
    }
};