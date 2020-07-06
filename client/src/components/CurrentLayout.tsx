import React, { useCallback } from 'react';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import { State, Current, DispatchI } from '../react-app-env';
import CurrentChat from './CurrentChat';
import CurrentUser from './CurrentUser';
import deleteChat from '../redux/actions/deleteChat';
import Dropdown from 'react-bootstrap/Dropdown';

const StyledCurrentLayout = styled.div`
    display: grid;
    grid-template-rows: 65px auto 60px;
    grid-template-areas:    "top"
                            "mid"
                            "bottom";

    .profile-bar {
        display: grid;
        align-items: center;
        grid-area: top;
        
        @media(max-width: 576px){
            grid-template-columns: auto 1fr;
        }
    }

    .current-user {
        grid-area: mid / bottom / -1;
    }

    .list-messages {
        grid-area: mid;
        height: 100%;
        overflow-y: auto;
    }

    .messages-box {
        grid-area: bottom;
        background-color: #f8f9fa;
    }
`;

export default function CurrentLayout() {
    const current = useSelector<State, Current>((state) => state.chats.current);
    const dispatch = useDispatch<DispatchI>();

    const user = current.user || current.chat?.user;

    const handleClose = useCallback(() => {
        dispatch({ type: 'CLOSE_CURRENT' });
    }, [dispatch]);

    const handleDelete = useCallback(() => {
        deleteChat(current.chat?._id as string, current.chat?.index as number)
            .then(response => dispatch(response))
            .catch(error => console.error(error));
    }, [current.chat, dispatch])

    if (current.chat === null && current.user === null) {
        return null;
    }

    return (
        <StyledCurrentLayout className="col-12 col-lg-9 col-sm-8 current-layout h-100">
            <div className="shadow-sm profile-bar bg-primary">
                <i className="material-icons text-white d-sm-none pl-2" onClick={handleClose}>arrow_back</i>
                <div className="dropdown">
                    <ProfileCard avatar={user?.avatar as string} username={user?.username as string}>
                        {
                            current.chat !== null && (
                                <Dropdown className="no-outline">
                                    <Dropdown.Toggle
                                        id={current.chat?._id as string}
                                        className="text-white"
                                        variant="link"
                                    >
                                        <span className="material-icons">more_vert</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="text-center">
                                        <Dropdown.Item onClick={handleDelete}>
                                            Eliminar chat
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )
                        }
                    </ProfileCard>
                </div>
            </div>
            {current.user !== null ? <CurrentUser /> : <CurrentChat />}
        </StyledCurrentLayout >
    );
}