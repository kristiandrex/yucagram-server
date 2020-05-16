import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  messages: [
    {
      type: Types.ObjectId,
      ref: 'Message'
    }
  ],
  lastModified: {
    type: Date,
    required: true
  }
});

export default model('Room', schema);