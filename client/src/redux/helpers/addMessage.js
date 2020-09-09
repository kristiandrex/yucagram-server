export default function addMessage(chats, { index, message }) {
	const copy = chats.slice();

	if (index === 0) {
		const messages = copy[0].messages.slice();

		messages.push(message);
		copy[0].messages = messages;
	}

	else {
		const chat = copy.splice(index, 1)[0];
		const messages = chat.messages.slice();

		messages.push(message);
		chat.messages = messages;
		copy.unshift(chat);
	}

	return copy;
}