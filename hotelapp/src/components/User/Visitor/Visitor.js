import React from 'react';
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Favorites from '../../../containers/User/Visitor/Favorites';
import VisitorHistory from '../../../containers/User/Visitor/VisitorHistory';
import VisitorProfile from '../../../containers/User/Visitor/VisitorProfile';
import VisitorChangepass from '../../../containers/User/Visitor/VisitorChangepass';

const visitor = (props) => {
	return(
		<Switch>
			<Route path="/visitor/favorites" component={Favorites} />
			<Route path="/visitor/history" component={VisitorHistory}/>
			<Route path="/visitor/profile" component={VisitorProfile}/>
			<Route path="/visitor/changepass" component={VisitorChangepass} />
			<Route path="/visitor" component={Favorites} />
		</Switch>
	);
}

export default visitor;