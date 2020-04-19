import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  from: {
    type: Types.ObjectId,
    ref: 'User'
  }, 
  to: {
    type: Types.ObjectId,
    ref: 'User'
  },
  content: String,
  file: {
    type: Boolean,
    default: false
  },
  url: String,
  date: Date
});

export default model('Message', schema);