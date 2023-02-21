import {
    getModelForClass,
    index,
    modelOptions,
    prop,
    post,
} from '@typegoose/typegoose';

@index({ id: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

export class Card {
    @prop({ unique: true })
    id: string;

    @prop({ required: true, minlength: 1 })
    titulo: string;

    @prop({ required: true, minlength: 1 })
    conteudo: string;

    @prop({ required: true, minlength: 1 })
    lista: string;
}

const cardModel = getModelForClass(Card);
export default cardModel;

