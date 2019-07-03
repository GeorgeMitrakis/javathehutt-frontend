import React from 'react';
import { withRouter } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import produce from 'immer';


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
                
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="facilities">
                        <Row>
                        <Col sm="12">
                            <h4>Tab 1 paroxes</h4>
                        </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="photos">
                         <Row>
                        <Col sm="12">
                            <h4>Tab 2 photos</h4>
                        </Col>
                        </Row>
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
