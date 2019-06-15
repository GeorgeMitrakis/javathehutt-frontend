import React from 'react';
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Administration from '../../../containers/User/Admin/Administration';
import Profile from '../../../containers/User/Admin/Profile';
import Changepass from '../../../containers/User/Admin/Changepass';

const admin = (props) => {
	return(
		<Switch>
			<Route path="/admin/administration" component={Administration} />
			<Route path="/admin/profile" component={Profile}/>
			<Route path="/admin/changepass" component={Changepass}/>
			<Route path="/admin" component={Administration} />
		</Switch>
	);
}

export default admin;