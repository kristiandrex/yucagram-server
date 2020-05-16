import { Schema, model, Types } from 'mongoose';

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
    type: String,
    required: true
  }
});

export default model('Message', schema);