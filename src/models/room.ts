import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  messages: [
    {
      type: Types.ObjectId,
      ref: 'Message'
    }
  ]
});

export default model('Room', schema);