import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import cardModel, { Card } from '../model/card.model';
import { excludedFields } from '../controllers/auth.controller';
import { v4 as uuidv4 } from 'uuid';

export const createCard = async (input: Partial<Card>) => {
    input.id = uuidv4();
    const card = await cardModel.create(input);
    card.id = card._id;
    return card;
}

export const findCardById = async (id: string) => {
    const card = await cardModel.findById(id).lean();
    card!.id = card!._id;
    return card;
};

export const findAllCards = async () => {
    // set id from _id to every item of array
    const cards = await cardModel.find().lean();
    cards.forEach((card) => {
        card.id = card._id;
    });
    return cards;
}

export const findCard = async (
    query: FilterQuery<Card>,
    options: QueryOptions = {}
) => {
    const card = await cardModel.findOne(query, {}, options);
    card!.id = card!._id;
    return card;
};

export const updateCard = async (id: string, input: Partial<Card>) => {
    await cardModel.updateOne({ _id: id }, input);
    return await findCardById(id);
}

export const deleteCard = async (id: string) => {
    await cardModel.deleteOne({ _id: id });
    return await findAllCards();
}