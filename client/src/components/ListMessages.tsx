import React, { useRef, useEffect } from 'react';
import { Message, State, User } from '../react-app-env';
import MessagePill from './MessagePill';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

interface Props {
  messages: Message[];
}

const StyledListMessages = styled.div`
  .message-row {
    padding-bottom: 8px;
  }

  .message-row:first-child {
    padding-top: 8px;
  }
`;

export default function ListMessages({ messages }: Props) {
  const user: User = useSelector<State>((state) => state.user) as User;
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollHeight: number = listRef.current?.scrollHeight as number;
    const clientHeight: number = listRef.current?.clientHeight as number;

    listRef.current?.scrollTo(0, scrollHeight - clientHeight);
  }, [])

  useEffect(() => {
    const current = listRef.current;

    if (current === null) {
      return;
    }

    const children: HTMLCollection = current.children;

    const scrollHeight: number = current.scrollHeight;
    const clientHeight: number = current.clientHeight;

    if (children.length === 0 || scrollHeight === clientHeight) {
      return;
    }
 
    const scrollTop: number = current.scrollTop;

    const lastChildren: Element = children[children.length - 1];
    const previousChildrenHeigth: number = lastChildren.previousElementSibling?.clientHeight || 0;

    if (scrollTop >= (scrollHeight - clientHeight - previousChildrenHeigth)) {
      current.scrollTo(0, scrollHeight - clientHeight);
    }
  }, [messages])

  return (
    <StyledListMessages className="list-messages px-2" ref={listRef} >
      {
        messages.map(message => (
          <MessagePill key={message._id} message={message} own={user._id === message.from} />
        ))
      }
    </StyledListMessages>
  )
};