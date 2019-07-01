import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Administration from '../../../containers/User/Admin/Administration';

const admin = (props) => {
	return(
		<Switch>
			<Route path="/admin/administration" component={Administration} />
			{/* <Route path="/admin/profile" component={AdminProfile}/>
			<Route path="/admin/changepass" component={AdminChangepass}/> */}
			<Route path="/admin" component={Administration} />
		</Switch>
	);
}

export default admin;