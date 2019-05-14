import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import Results from '../../components/UI/SearchResult/Results';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

import styles from './SearchResults.module.css';

class SearchResults extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            data: []
        };
    }

    render() {

        const sth =  this.state.data.map((room) =>
            <Results 
                details={room}
            />
        );
        
        return (
            <Container className={styles['results']}>{sth}</Container>   
        );
    }

    componentDidMount(){
        console.log("componentDidMount()");
        fetch('http://localhost:8765/app/api/dummy?field=rooms')
        .then(response => response.json())
        .then(jsonData => {
            // let rooms = jsonData.map((roomData) => {
            //     return(
            //         <div>{roomData}</div>
            //     )
            // })

            this.setState(
                produce(draft => {
                    draft.data = jsonData;
                })
            )
            // <Results results={jsonData} />
            console.log(jsonData);
        });
        // .catch(() => {
        //     console.log("error");
        // });

        // this.setState(
        //     produce(draft => {
        //         draft.data = jsonData;
        //     })
        // )
    }
}


export default withRouter(SearchResults);