import { model, Schema, Types } from 'mongoose';
import { ChatI } from '../@types';

const schema = new Schema({
    users: {
        required: true,
        type: [{
            type: Types.ObjectId,
            ref: 'User',
            required: true
        }],
        maxlength: 2,
        inmutable: true
    },
    messages: [{
        type: Types.ObjectId,
        ref: 'Message'
    }],
    unread: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'CHAT',
        inmutable: true
    }
}, { timestamps: true });

export default model<ChatI>('Chat', schema);