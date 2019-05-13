import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import Results from '../../components/UI/SearchResult/Results';

class SearchResults extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            data: null
        };
    }

    render() {
        
        return (
            <div className="paragraph">
                <h1>Edwwww</h1>
            </div>
        )
    }

    componentDidMount(){
        fetch("http://localhost:8765/app/api/dummy?field=rooms")
        .then(response => response.json())
        .then(jsonData => {
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