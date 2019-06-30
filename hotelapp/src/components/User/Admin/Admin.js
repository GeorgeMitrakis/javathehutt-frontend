import React from 'react';
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Administration from '../../../containers/User/Admin/Administration';
import AdminProfile from '../../../containers/User/Admin/AdminProfile';
import AdminChangepass from '../../../containers/User/Admin/AdminChangepass';

const admin = (props) => {
	return(
		<Switch>
			<Route path="/admin/administration" component={Administration} />
			<Route path="/admin/profile" component={AdminProfile}/>
			<Route path="/admin/changepass" component={AdminChangepass}/>
			<Route path="/admin" component={Administration} />
		</Switch>
	);
}

export default admin;