import React, { Component } from 'react';

class Favorites extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<h3 className="d-flex justify-content-center" style={{marginTop:'15%'}}>
				Hello dear Visitor, this is a page for you to view your favorite rooms.
			</h3>
		);
	}
}

export default Favorites;