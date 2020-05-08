import { model, Schema, Types } from 'mongoose';

const schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  room: {
    type: Types.ObjectId,
    ref: 'Room'
  }
});

export default model('Chat', schema);