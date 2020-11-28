import { Schema, model, Types } from 'mongoose';
import { MessageI } from '../@types';

const schema = new Schema({
    chat: {
        type: Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    user: {
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
    },
    seen: {
        type: Boolean,
        default: false
    }
});

export default model<MessageI>('Message', schema);