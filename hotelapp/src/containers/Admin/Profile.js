import React, { Component } from 'react';

class Profile extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<h3 className="d-flex justify-content-center" style={{marginTop:'15%'}}>
				Hello dear Admin, this is a page for you to edit your profile info.
			</h3>
		);
	}
}

export default Profile;