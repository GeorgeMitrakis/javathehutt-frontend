import React from 'react';
import { Route, Switch } from 'react-router-dom';
import VisitorHistory from '../../../containers/User/Visitor/VisitorHistory';
import VisitorProfile from '../../../containers/User/Visitor/VisitorProfile';
import VisitorChangepass from '../../../containers/User/Visitor/VisitorChangepass';

const visitor = (props) => {
	return(
		<Switch>
			<Route path="/visitor/history" component={VisitorHistory}/>
			<Route path="/visitor/profile" component={VisitorProfile}/>
			<Route path="/visitor/changepass" component={VisitorChangepass} />
			<Route path="/visitor" component={VisitorHistory} />
		</Switch>
	);
}

export default visitor;