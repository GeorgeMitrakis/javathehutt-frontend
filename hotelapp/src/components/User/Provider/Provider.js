import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Myrooms from '../../../containers/User/Provider/ProviderRooms/Myrooms';
import ProviderHistory from '../../../containers/User/Provider/ProviderHistory';
import ProviderProfile from '../../../containers/User/Provider/ProviderProfile';
import ProviderChangepass from '../../../containers/User/Provider/ProviderChangepass';

const provider = (props) => {
	return(
		<Switch>
			<Route path="/provider/ProviderRooms/myrooms" component={Myrooms} />
			<Route path="/provider/history" component={ProviderHistory}/>
			<Route path="/provider/profile" component={ProviderProfile}/>
			<Route path="/provider/changepass" component={ProviderChangepass} />
			<Route path="/provider" component={Myrooms} />
		</Switch>
	);
}

export default provider;