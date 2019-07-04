import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';

class RoomCritic extends React.Component {

    render() {

        let stars = [] ;
        for (let i=1; i <= this.props.roomCritic.stars; i++)
        {
            stars.push(<i key={this.props.key + "_" + i} className="fas fa-star ml-1"></i>);
        }        

        return (
            <div className="d-flex justify-content-between align-items-center border">
                <div className="border">
                    {this.props.roomCritic.comment}
                </div>

                <div className="border">
                    {stars}
                </div>

            </div>
        );
    }

}


export default withRouter(RoomCritic);
