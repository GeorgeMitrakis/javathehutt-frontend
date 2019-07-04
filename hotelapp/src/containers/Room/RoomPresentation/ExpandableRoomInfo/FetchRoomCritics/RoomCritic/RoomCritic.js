import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Button } from 'reactstrap';
import { getUserInfoField } from '../../../../../../Utility/Utility';

class RoomCritic extends React.Component {

    render() {
        
        let isAdmin = getUserInfoField("role") === "admin";
        // alert(getUserInfoField("role"));
    // isAdmin = true;

        let stars = [] ;
        for (let i=1; i <= this.props.roomCritic.stars; i++)
        {
            stars.push(<i key={this.props.key + "_" + i} className="fas fa-star ml-1"></i>);
        }        

        return (
            <div className="d-flex justify-content-between align-items-center ">
                <Container fluid>
                    <Row className="border">
                        { isAdmin ? 
                            (<Col xs="1" className=" d-flex align-items-center justify-content-center border-right p-0">
                                <Button onClick={this.props.deleteCriticHandler} className=" m-0" color="danger">
                                    <i className="fas fa-trash-alt"></i>
                                </Button>
                            </Col>
                            ): null
                        }

                        <Col xs="9" className=" p-0 pl-1 border-right">
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
