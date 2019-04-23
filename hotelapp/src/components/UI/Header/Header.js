import React from 'react';
import classes from './Header.module.css';

const header = ( props ) => {

    return (
        <div className={"font-weight-bold " + props.classes}  id={classes.header}>
            {props.children}
        </div>
    );

}


export default header;