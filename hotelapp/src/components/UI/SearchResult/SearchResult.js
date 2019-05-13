import React from 'react';

const searchResult = ({results}) => {
    return results.map(r => <div>{r}</div>);
}

export default searchResult;