import React from 'react'

interface Props {
    show: boolean;
    message: string;
}

export default function InvalidFeedback({ show, message }: Props) {
    if(!show)
        return null;

    return (
        <div className="invalid-feedback">
            {message}
        </div>
    )
}
