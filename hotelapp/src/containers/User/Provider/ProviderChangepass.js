import React, { Component } from 'react';

class ProviderChangepass extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<h3 className="d-flex justify-content-center" style={{marginTop:'15%'}}>
				Hello dear Provider, this is a page for you to change your password.
			</h3>
		);
	}
}

export default ProviderChangepass;