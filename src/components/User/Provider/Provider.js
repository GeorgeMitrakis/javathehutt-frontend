import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProviderRooms from '../../../containers/User/Provider/ProviderRooms/ProviderRooms';
import ProviderHistory from '../../../containers/User/Provider/ProviderHistory';
import ProviderProfile from '../../../containers/User/Provider/ProviderProfile';
import ProviderChangepass from '../../../containers/User/Provider/ProviderChangepass';

const provider = (props) => {
	return(
		<Switch>
			<Route path="/provider/ProviderRooms/myrooms" component={ProviderRooms} />
			<Route path="/provider/history" component={ProviderHistory}/>
			<Route path="/provider/profile" component={ProviderProfile}/>
			<Route path="/provider/changepass" component={ProviderChangepass} />
			<Route path="/provider" component={ProviderRooms} />
		</Switch>
	);
}

export default provider;