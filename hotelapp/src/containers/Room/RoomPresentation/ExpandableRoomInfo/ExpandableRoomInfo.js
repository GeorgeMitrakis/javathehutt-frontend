import React from 'react';
import { withRouter } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import produce from 'immer';
import FetchRoomPhotos from './FetchRoomPhotos/FetchRoomPhotos';


class ExpandableRoomInfo extends React.Component {

    constructor(props) {
        super(props);
    
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeTab: 'facilities'
        };
    }
    
    toggleTab(tabName) {
        if (this.state.activeTab !== tabName) 
        {
            // this.setState({
            //     activeTab: tab
            // });
            this.setState(
                produce(draft => {
                    draft.activeTab = tabName;
                })
            );
        }
    }

    render() {

        if (!this.props.renderFlag)
        {
            return null;
        }

        // alert("paw gia render");

        const activeTabStyle = {
            color: "rgb(40, 30, 182)",
            fontWeight: "bold",
            // fontSize: "calc(4px + 2vmin)",
            borderColor: "rgb(40, 30, 182)"
        };

        const inactiveTabStyle = {
            borderColor: "lightgrey"
        };

        return (
            <>
                <Nav tabs className="justify-content-center mt-2" style={{borderColor: "rgb(40, 30, 182)"}}>
                    <NavItem>
                        <NavLink className={"border-bottom-0 pointer " + classnames({ active: this.state.activeTab === 'facilities' })} 
                                onClick={ () => this.toggleTab('facilities') }
                                style={ this.state.activeTab === 'facilities' ? activeTabStyle : inactiveTabStyle }
                        >
                            Παροχές
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className={"border-bottom-0 pointer " + classnames({ active: this.state.activeTab === 'photos' })} 
                                 onClick={ () => this.toggleTab('photos') }
                                 style={ this.state.activeTab === 'photos' ? activeTabStyle : inactiveTabStyle }
                        >
                            Φωτογραφίες
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className={"border-bottom-0 pointer " + classnames({ active: this.state.activeTab === 'critics' })} 
                                 onClick={ () => this.toggleTab('critics') }
                                 style={ this.state.activeTab === 'critics' ? activeTabStyle : inactiveTabStyle }
                        >
                            Κριτικές
                        </NavLink>
                    </NavItem>
                </Nav>
                
                <TabContent className="border p-2 " activeTab={this.state.activeTab}>
                    <TabPane className="border" tabId="facilities">
                        <Container className="border">
                            {this.props.room.breakfast ?
                                (<Row className="border pl-3 align-items-center">
                                    <i className="fas fa-coffee mr-3"></i> Πρωινό
                                </Row>
                                ) : null
                            }

                            {this.props.room.shauna ?
                                (<Row className="border pl-3 align-items-center">
                                    <i className="fas fa-hot-tub mr-3"></i> Σάουνα
                                </Row>
                                ) : null
                            }

                            {this.props.room.pool ?
                                (<Row className="border pl-3 align-items-center">
                                    <i className="fas fa-swimming-pool mr-3"></i> Πισίνα
                                </Row>
                                ) : null
                            }

                            {this.props.room.wifi ?
                                (<Row className="border pl-3 align-items-center">
                                    <i className="fas fa-wifi mr-3"></i> WiFi
                                </Row>
                                ) : null
                            }

                            {!this.props.room.wifi && !this.props.room.shauna && !this.props.room.breakfast && !this.props.room.pool ?
                                (<Row className="border pl-3 align-items-center text-muted font-italic">
                                    Δεν είναι διαθέσιμες ειδικές παροχές
                                </Row>
                                ) : null
                            }

                        </Container>
                    </TabPane>

                    <TabPane tabId="photos">
                        <FetchRoomPhotos
                            roomId = {this.props.room.id}
                        />
                    </TabPane>

                    <TabPane tabId="critics">
                         <Row>
                        <Col sm="12">
                            <h4>Tab 3 critics</h4>
                        </Col>
                        </Row>
                    </TabPane>

                </TabContent>
            </>
        );
    }

}


export default withRouter(ExpandableRoomInfo);
