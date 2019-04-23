import React from 'react';
import classes from './SubmitBtn.module.css';
import { Button } from 'reactstrap';

const submitBtn = ( props ) => {

    return (
        <Button style={{"border-width": props.borderWidth }} className={"font-weight-bold " + props.classes} id={classes.submit_btn}>
            {props.children}
        </Button> 
    );

}


export default submitBtn;

