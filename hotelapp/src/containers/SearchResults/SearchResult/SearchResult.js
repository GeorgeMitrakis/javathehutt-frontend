import React from 'react';
import {  withRouter } from 'react-router-dom';

import { Container, Col, Row, Button, Collapse } from 'reactstrap';


import styles from './Result.module.css';
// import RoomInfo from '../../containers/RoomInfo/Roominfo';
import Header from '../../../components/UI/Header/Header';
import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';
import produce from 'immer';



class SearchResult extends React.Component {

    constructor(props) {
        super(props);

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleRoomForm = this.toggleRoomForm.bind(this);

        this.state = { 
            expanded: false,
            roomFormModal: false,
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
                    alert("EXPANEDED ");
                    draft.expanded = true;
                }
            })
        );
    }

    toggleRoomForm() {
        // this.setState(state => (
        //     { roomFormModal: !state.roomFormModal }
        // ));

        this.setState(
            produce(draft => {
                draft.roomFormModal = !draft.roomFormModal;
            })
        );
    }

    render() {
    
        const items = [
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
              altText: 'Slide 1',
              caption: ""
            },
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
              altText: 'Slide 2',
              caption: ""
            },
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
              altText: 'Slide 3',
              caption: ""
            }
          ];

        const photo = "https://s-ec.bstatic.com/images/hotel/max1024x768/731/73118462.jpg";
    
        let stars = [] ;
        for (let i=1; i <= 5; i++)
        {
            stars.push(<i key={this.props.room.id + "_" + i} className="fas fa-star ml-1"></i>);
        }

        return (
            <Row className={"mb-4 p-2 " + styles.room}>
                <Container fluid className="border">
                    <Row className="border">
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
                                    <Button color="link" onClick={this.toggleCollapse} >
                                        {!this.state.collapse ? "Περισσότερα" : "Λιγότερα"}
                                    </Button>
                                </div>

                                <div className="d-flex">
                                    <Header classes="d-flex align-items-center mr-3">
                                        {this.props.room.price} {" "} €
                                    </Header>

                                    <div onClick={this.props.bookRoomHandler}>
                                        <SubmitBtn >
                                            Κράτηση
                                        </SubmitBtn>
                                    </div>
                                </div>
                            </div>
                        
                        </Col>
                    </Row>

                    <Row className="border">
                        <Collapse isOpen={this.state.collapse}>
                            {   this.state.expanded ?
                                (
                                    <p>
                                    Anim pariatur cliche reprehenderit,
                                    enim eiusmod high life accusamus terry richardson ad squid. Nihil
                                    anim keffiyeh helvetica, craft beer labore wes anderson cred
                                    nesciunt sapiente ea proident.
                                    </p>
                                )
                                : null
                            }
                        </Collapse>
                    </Row>
                </Container>
            </Row>
        );
    }

}



export default withRouter(SearchResult);