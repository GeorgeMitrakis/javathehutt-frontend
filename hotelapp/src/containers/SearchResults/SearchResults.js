import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import produce from 'immer';
import Results from '../../components/UI/SearchResult/Results'

class SearchResults extends React.Component {

    render() {
        return (
            <div className="paragraph" styl>
                <h1>Edwwww</h1>
                {/*<Result results={results} />*/}
            </div>
        )
    }
}


export default withRouter(SearchResults);