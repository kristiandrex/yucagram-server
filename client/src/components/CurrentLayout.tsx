import React, { useCallback } from 'react';
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import { useSelector, useDispatch } from 'react-redux';
import { State, Current, User, DispatchI } from '../react-app-env';
import CurrentChat from './CurrentChat';
import CurrentUser from './CurrentUser';

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
    }
`;

export default function CurrentLayout() {
    const current = useSelector<State, Current>((state) => state.current);
    const dispatch = useDispatch<DispatchI>();

    const handleClose = useCallback(() => {
        dispatch({ type: 'CLOSE_CURRENT' });
    }, [dispatch]);

    return (
        <StyledCurrentLayout className="col-12 col-lg-9 col-sm-8 current-layout h-100">
            <div className="shadow-sm profile-bar bg-primary">
                <i className="material-icons text-white d-sm-none pl-2" onClick={handleClose}>arrow_back</i>
                <ProfileCard user={current.user || current.chat?.user as User} />
            </div>
            {current.user !== null ? <CurrentUser /> : <CurrentChat />}
        </StyledCurrentLayout>
    );
}
