import React from 'react';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';


const myInput = ( props ) => {
    
    return (
        <FormGroup>
            <Label for={props.id} className="font-weight-bold small">{props.name}</Label>
            <Input required={props.required} onChange={props.changed} value={props.value}  type={props.type} className="" id={props.id} placeholder={props.placeholder}/>
        </FormGroup>
    );

};

export default myInput;