import React from 'react';
import { NavLink as RouterNavLink }  from 'react-router-dom';
import { NavItem, Button } from 'reactstrap';

const navigationItem = ( props ) => (
    <NavItem className="d-flex align-content-center p-1">
        <RouterNavLink
            style={{textDecoration: "none"}}
            className="container fluid align-self-center p-0"
            exact
            to={props.navDest}
        >
            <Button className="font-weight-bold" color="light" size="sm" block>
                {props.navItemText}
            </Button>
        </RouterNavLink>  
    </NavItem>
);

export default navigationItem;