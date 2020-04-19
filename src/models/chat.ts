import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  messages: [{ type: Types.ObjectId, ref: 'Message' }]
});

export default model('Chat', schema);