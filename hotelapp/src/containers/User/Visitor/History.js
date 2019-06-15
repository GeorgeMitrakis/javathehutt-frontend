import React, { Component } from 'react';

class History extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<h3 className="d-flex justify-content-center" style={{marginTop:'15%'}}>
				Hello dear Visitor, this is a page for you view your booking history.
			</h3>
		);
	}
}

export default History;