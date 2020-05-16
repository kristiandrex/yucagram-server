import { Schema, model, Types } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default:
      'https://res.cloudinary.com/kristiantorrex/image/upload/v1587258574/undraw_male_avatar_323b_gukmtl.svg'
  },
  socket: {
    type: String,
    default: null
  },
  chats: [{
    type: Types.ObjectId,
    ref: 'Chat'
  }]
});

schema.plugin(uniqueValidator);

schema.methods.toJSON = function () {
  let object = this.toObject();
  delete object.password;
  return object;
};

export default model('User', schema);
