import React from 'react';
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Myrooms from '../../../containers/User/Provider/Myrooms';
import History from '../../../containers/User/Provider/History';
import Profile from '../../../containers/User/Provider/Profile';
import Changepass from '../../../containers/User/Provider/Changepass';

const provider = (props) => {
	return(
		<Switch>
			<Route path="/provider/myrooms" component={Myrooms} />
			<Route path="/provider/history" component={History}/>
			<Route path="/provider/profile" component={Profile}/>
			<Route path="/provider/changepass" component={Changepass} />
			<Route path="/provider" component={Myrooms} />
		</Switch>
	);
}

export default provider;