import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';

class RoomCritic extends React.Component {

    render() {

        let stars = [] ;
        for (let i=1; i <= this.props.roomCritic.stars; i++)
        {
            stars.push(<i key={this.props.key + "_" + i} className="fas fa-star ml-1"></i>);
        }        

        return (
            <div className="d-flex justify-content-between align-items-center ">
                <Container fluid>
                    <Row className="">
                        <Col xs="10" className=" p-0">
                            {this.props.roomCritic.comment}
                        </Col>

                        <Col xs="2" className=" p-0 sec_color">
                            {stars}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}


export default withRouter(RoomCritic);
