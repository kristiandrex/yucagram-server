import { model, Schema, Types } from 'mongoose';
import { ChatI } from '../@types';

const schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: Types.ObjectId,
    ref: 'Room',
    required: true
  },
  unread: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default model<ChatI>('Chat', schema);