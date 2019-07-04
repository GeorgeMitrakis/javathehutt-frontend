
import React from 'react';
import {  withRouter } from 'react-router-dom';
import styles from './RoomPresentation.module.css';
import { Container, Col, Row, Button, Collapse } from 'reactstrap';
import ExpandableRoomInfo from './ExpandableRoomInfo/ExpandableRoomInfo';

import Header from '../../../components/UI/Header/Header';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';
import produce from 'immer';


class RoomPresentation extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.room)
        this.toggleCollapse = this.toggleCollapse.bind(this);

        this.state = { 
            expanded: false,
            collapse: false 
        };
    }
    
    toggleCollapse() {
        // this.setState(state => (
        //     { collapse: !state.collapse }
        // ));

        this.setState(
            produce(draft => {
                draft.collapse = !draft.collapse;
                if (!draft.expanded)
                {
                    // alert("EXPANEDED ");
                    draft.expanded = true;
                }
            })
        );
    }

    render() {
        
        const photo = "https://s-ec.bstatic.com/images/hotel/max1024x768/731/73118462.jpg";
            
        let stars = [] ;
        for (let i=1; i <= 5; i++)
        {
            stars.push(<i key={this.props.room.id + "_" + i} className="fas fa-star ml-1"></i>);
        }

        return (
            <Row className={"mb-4 " + styles.room}>
                <Container fluid className="border">
                    <Row className="border p-2">
                        <Col md="4" className="p-0 m-0 border">
                            <img src={photo} style={{height: "100%", width: "100%", maxHeight: "40vh"}} alt="Room Photo" className="img-fluid rounded"/>
                        </Col>

                        <Col md="8" className="p-0 m-0 pl-2 d-flex-column border">
                            <div className="d-flex align-items-center">
                                <Header classes="d-flex flex-shrink-1 border">
                                    {this.props.room.provider.providername}
                                </Header>

                                <div className="d-flex flex-grow-1 font-weight-bold sec_color border">
                                    {stars}
                                </div>
                            </div>

                            <div className={styles.sub_header}> 
                                {this.props.room.roomName}
                            </div>

                            <div className="text-muted small"> 
                                <i className="fas fa-map-marker-alt mr-2"></i>
                                {this.props.room.location.cityname}
                            </div>

                            <div className="mt-2 mb-2">
                                {this.props.room.description}
                                {/* Lorem Ipsum is simply dummy text of the printing and typesetting  */}
                                {/* industry. Lorem Ipsum has been the industry's standard dummy text eve */}
                            </div>

                            <div className="d-flex justify-content-between border">
                                <div className="d-flex align-items-center border">
                                    <Button className="p-0 m-0" color="link" onClick={this.toggleCollapse} >
                                        {!this.state.collapse ? "Περισσότερα" : "Λιγότερα"}
                                    </Button>
                                </div>

                                <div className="d-flex p-0 m-0">
                                    <Header classes="d-flex align-items-center mr-3">
                                        {this.props.room.price} {" "} €
                                    </Header>

                                    {  this.props.renderProvFuncs ?
                                        (   <div className="d-flex justify-content-end border">
                                                <Button style={{color: "black"}} color="primary" className="font-weight-bold mr-2" onClick={this.props.editRoomModalHandler}>
                                                    <i className="fas fa-pencil-alt"></i>           
                                                </Button>

                                                <Button style={{color: "black"}} color="danger" className="font-weight-bold" onClick={this.props.deleteRoomModalHandler}>
                                                    <i className="fas fa-trash-alt" ></i>
                                                </Button>
                                            </div>
                                        ) : 
                                        (
                                            <div onClick={this.props.bookRoomHandler}>
                                                <SubmitBtn >
                                                    Κράτηση
                                                </SubmitBtn>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        
                        </Col>
                    </Row>

                    <Row className="border">
                        <Collapse className="w-100" isOpen={this.state.collapse}>
                            <ExpandableRoomInfo 
                                room={this.props.room}
                                renderFlag={this.state.expanded}
                            />
                        </Collapse>
                    </Row>
                </Container>
            </Row>
        );
    }

}


export default withRouter(RoomPresentation);