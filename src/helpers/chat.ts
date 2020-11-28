import Chat from '../models/chat';

async function find(query: any) {
    try {
        const chat = await Chat.findOne(query);
        return chat;
    }

    catch (error) {
        console.log(error);
    }
}

function create() {

}

export {
    find,
    create
}