import { model, Schema, Types } from 'mongoose';

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
  }
});

export default model('Chat', schema);