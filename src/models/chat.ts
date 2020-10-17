import { model, Schema, Types } from 'mongoose';
import { ChatI } from '../@types';

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
  messages: [{
    type: Types.ObjectId,
    ref: 'Message'
  }],
  unread: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default model<ChatI>('Chat', schema);