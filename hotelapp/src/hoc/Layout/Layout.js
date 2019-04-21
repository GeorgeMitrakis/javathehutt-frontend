import React from 'react';

import NavBar from '../../containers/Navigation/NavBar/NavBar';


const layout = (props) => (
    <>
        <NavBar isAuth={props.isAuth}/>
        {props.children}
    </>
);

export default layout;