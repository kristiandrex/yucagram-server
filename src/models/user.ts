import { Schema, model, Types } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { UserI } from '../@types';

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'El nombre de usuario es obligatorio']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'La constraseña es obligatoria']
  },
  avatar: {
    type: String,
    default:
      'https://res.cloudinary.com/kristiantorrex/image/upload/v1587258574/undraw_male_avatar_323b_gukmtl.svg'
  },
  chats: [
    {
      type: Types.ObjectId,
      ref: 'Chat'
    }
  ],
  new: {
    type: Boolean,
    default: true
  }
});

schema.plugin(uniqueValidator);

schema.methods.toJSON = function () {
  let object = this.toObject();
  delete object.password;
  return object;
};

export default model<UserI>('User', schema);
