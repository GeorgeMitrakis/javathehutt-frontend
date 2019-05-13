import React from 'react';

const Results = (props) => {
    return (
        <div>
            <p>{props.details.name}</p>
            <p>{props.details.location}</p>
            <p>{props.details.capacity}</p>
            <p>{props.details.price}</p>
        </div>
    );
}

export default Results;