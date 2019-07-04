import { Component } from 'react';

class Logout extends Component {

    render () {
        return (null);
    }

    componentDidMount() {
        this.props.logOut();
    }

}

export default Logout;