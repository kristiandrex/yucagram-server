import { Schema, model, Types } from 'mongoose';
import { MessageI } from '../@types';

const schema = new Schema({
  from: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  to: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

export default model<MessageI>('Message', schema);