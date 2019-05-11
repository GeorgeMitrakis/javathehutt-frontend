import React from 'react';
import {Col, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";

const dateCalendar = (props) =>{

    let initdate="";
    initdate  = initdate  + props.inityear +"-";
    if(props.initmonth<10)
        initdate  = initdate  + "0";
    initdate  = initdate  +  props.initmonth +"-";
    if(props.initday<10)
        initdate  = initdate  + "0";
    initdate  = initdate  +  props.initday;


    let currdate ="";
    currdate = currdate + props.year +"-";
    if(props.month<10)
        currdate = currdate + "0";
    currdate = currdate +  props.month +"-";
    if(props.day<10)
        currdate = currdate + "0";
    currdate = currdate +  props.day;

    return (
        <Col className={props.search_border + " m-0 p-0"} xs="6" md="3" lg="auto">
            <Label hidden for={props.id}>{props.text}</Label>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText className="bg-transparent border-0 text-secondary">
                        <i className="far fa-calendar-alt"></i>
                        <span className="ml-3 font-weight-bold"> {props.text} </span>
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    type="date"
                    className="form-control border-0 p-0 rm_hl"
                    id={props.id}
                    min={initdate}
                    value={currdate}
                    onChange={props.change}
                />
            </InputGroup>
        </Col>
    )
}


export default dateCalendar;