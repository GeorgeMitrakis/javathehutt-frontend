import React from 'react';
import classes from './NavBar.module.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button } from 'reactstrap';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
        };
    }

    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
        <div>
            <Navbar light expand="sm" className={classes.bg_color + " fixed-top"} >
                <NavbarBrand href="/">Logo</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#">
                                <Button className="font-weight-bold" color="light" size="sm" block>
                                    Log In
                                </Button>
                            </NavLink>                        
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">
                                <Button className="font-weight-bold" color="light" size="sm" block>
                                    Sign Up
                                </Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}

export default NavBar;
