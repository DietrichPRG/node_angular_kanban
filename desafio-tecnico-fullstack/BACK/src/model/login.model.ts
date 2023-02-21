import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from '@typegoose/typegoose';

@index({ login: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})

export class Login {
  @prop({ unique: true, minlength: 8, required: true })
  login: string;

  @prop({ required: true, minlength: 8, maxLength: 32, select: false })
  senha: string;

  async compareSenhas(senhaArmazenada: string, senhaCandidata: string) {
    return senhaArmazenada === senhaCandidata;
  }
}

const loginModel = getModelForClass(Login);
export default loginModel;

