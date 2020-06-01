import { Schema, model, Types } from 'mongoose';
import { RoomI } from '../@types';

const schema = new Schema({
  messages: [
    {
      type: Types.ObjectId,
      ref: 'Message'
    }
  ],
  users: {
    required: true,
    type: [
      {
        type: Types.ObjectId,
        ref: 'User'
      }
    ]
  }
}, { timestamps: true });

export default model<RoomI>('Room', schema);