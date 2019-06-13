import React from 'react';
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Administration from '../../../containers/Admin/Administration';
import Profile from '../../../containers/Admin/Profile';

const admin = (props) => {
	return(
		<Switch>
			<Route path="/admin/administration" component={Administration} />
			<Route path="/admin/profile" component={Profile}/>
			<Route path="/admin" component={Administration} />
		</Switch>
	);
}

export default admin;