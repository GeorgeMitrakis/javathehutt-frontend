import React from 'react';
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Favorites from '../../../containers/User/Visitor/Favorites';
import History from '../../../containers/User/Visitor/History';
import Profile from '../../../containers/User/Visitor/Profile';
import Changepass from '../../../containers/User/Visitor/Changepass';

const visitor = (props) => {
	return(
		<Switch>
			<Route path="/visitor/favorites" component={Favorites} />
			<Route path="/visitor/history" component={History}/>
			<Route path="/visitor/profile" component={Profile}/>
			<Route path="/visitor/changepass" component={Changepass} />
			<Route path="/visitor" component={Favorites} />
		</Switch>
	);
}

export default visitor;