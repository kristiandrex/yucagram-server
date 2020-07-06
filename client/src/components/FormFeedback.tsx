import React from 'react'
import InvalidFeedback from './InvalidFeedback'

interface Props {
    error: boolean;
    valid: string;
    invalid: string;
}

export default function FormFeedback({ error, valid, invalid }: Props) {
    if (error) {
        return <InvalidFeedback show={true} message={invalid} />
    }

    return (
        <small className="text-muted form-text mt-2">
            {valid}
        </small>
    )
}
