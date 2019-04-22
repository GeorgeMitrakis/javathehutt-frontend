import React from 'react';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';


const myInput = ( props ) => {
    
    return (
        <FormGroup>
            <Label for={props.name} className="font-weight-bold small">{props.name}</Label>
            <Input onChange={props.changed} value={props.value} required type={props.type} className="" id={props.name} placeholder={props.placeholder}/>
        </FormGroup>
    );

};

export default myInput;