import React, { useRef, useEffect } from 'react';
import { Message, State, User } from '../react-app-env';
import MessagePill from './MessagePill';
import { useSelector } from 'react-redux';

interface Props {
  messages: Message[];
}

export default function ListMessages({ messages }: Props) {
  const user: User = useSelector<State>((state) => state.user) as User;

  const listMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToDown = () => {
    const children: HTMLCollection = listMessagesRef.current?.children as HTMLCollection;

    const scrollHeight: number = listMessagesRef.current?.scrollHeight as number;
    const clientHeight: number = listMessagesRef.current?.clientHeight as number;

    if (children.length === 0 || scrollHeight === clientHeight) {
      return;
    }

    const scrollTop: number = listMessagesRef.current?.scrollTop as number;

    const lastChildrenPosition: number = children.length - 1;
    const lastChildren: Element = children[lastChildrenPosition];
    const previousChildren = lastChildren.previousElementSibling;
    const previousChildrenHeigth: number = previousChildren?.clientHeight || 0;

    if (scrollTop >= (scrollHeight - clientHeight - previousChildrenHeigth)) {
      listMessagesRef.current?.scrollTo(0, scrollHeight - clientHeight);
    }
  };

  useEffect(() => {
    scrollToDown();
  }, [messages]);

  useEffect(() => {
    const scrollHeight: number = listMessagesRef.current?.scrollHeight as number;
    const clientHeight: number = listMessagesRef.current?.clientHeight as number;

    listMessagesRef.current?.scrollTo(0, scrollHeight - clientHeight);
  }, [])

  return (
    <div className="list-messages px-2" ref={listMessagesRef}>
      {
        messages.map(message => (
          <MessagePill key={message._id} message={message} own={user._id === message.from} />
        ))
      }
    </div>
  )
};