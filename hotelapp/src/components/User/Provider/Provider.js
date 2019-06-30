import React from 'react';
import { Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Myrooms from '../../../containers/User/Provider/Myrooms';
import ProviderHistory from '../../../containers/User/Provider/ProviderHistory';
import ProviderProfile from '../../../containers/User/Provider/ProviderProfile';
import ProviderChangepass from '../../../containers/User/Provider/ProviderChangepass';

const provider = (props) => {
	return(
		<Switch>
			<Route path="/provider/myrooms" component={Myrooms} />
			<Route path="/provider/history" component={ProviderHistory}/>
			<Route path="/provider/profile" component={ProviderProfile}/>
			<Route path="/provider/changepass" component={ProviderChangepass} />
			<Route path="/provider" component={Myrooms} />
		</Switch>
	);
}

export default provider;