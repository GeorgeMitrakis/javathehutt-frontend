import React from 'react';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';


const myInput = ( props ) => {

    let formFeedback = null;
    if (props.validity === "is-valid")
    {
        formFeedback = (
            <FormFeedback valid> {props.feedback} </FormFeedback>
        )
    }
    else if (props.validity === "is-invalid")
    {
        formFeedback = (
            <FormFeedback invalid="true"> {props.feedback} </FormFeedback>
        )
	}
	
	if(props.readOnly){
		return (
			<FormGroup>
				<Label for={props.id} className="font-weight-bold small">{props.name}</Label>
				<Input readOnly
					onBlur={props.blurred} 
					className={props.validity} 
					onChange={props.changed} 
					value={props.value}  
					type={props.type} 
					id={props.id} 
					placeholder={props.placeholder} 
					defaultValue={props.defaultValue} 
					innerRef={props.innerRef}
				/>
				{formFeedback}
			</FormGroup>
		);
	}
    
    return (
        <FormGroup>
            <Label for={props.id} className="font-weight-bold small">{props.name}</Label>
			<Input 
				onBlur={props.blurred} 
				className={props.validity} 
				onChange={props.changed} 
				value={props.value}  
				type={props.type} 
				id={props.id} 
				min={props.min}
				placeholder={props.placeholder} 
				defaultValue={props.defaultValue} 
				innerRef={props.innerRef}
			/>
            {formFeedback}
        </FormGroup>
    );

};

export default React.memo(myInput);