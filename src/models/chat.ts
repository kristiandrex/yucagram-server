import { model, Schema, Types } from 'mongoose';
import { ChatI } from '../@types';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [
    {
      type: Types.ObjectId,
      ref: 'Message'
    }
  ],
  unread: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

schema.plugin(uniqueValidator, { message: 'unique' });

export default model<ChatI>('Chat', schema);