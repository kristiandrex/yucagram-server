import { model, Schema, Types } from 'mongoose';
import { ChatI } from '../@types';

/**
 * owner: user owner of the chat
 * user: the other user of chat
 * unread: messages unread
 * role: chat | group | user
 */
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
    messages: [{
        type: Types.ObjectId,
        ref: 'Message',
        required: true
    }],
    unread: {
        type: Number,
        default: 0,
        min: 0
    },
    role: {
        type: String,
        default: 'CHAT',
    }
}, { timestamps: true });

export default model<ChatI>('Chat', schema);