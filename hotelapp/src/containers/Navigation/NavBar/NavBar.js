import React from 'react';
import { NavLink as RouterNavLink }  from 'react-router-dom';
import classes from './NavBar.module.css';
import logo from '../../../assets/images/dummy_logo.png';
import NavigationItem from '../../../components/Navigation/NavigationItem/NavigationItem';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav } from 'reactstrap';

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
                <NavbarBrand>
                    <RouterNavLink to="/" exact>
                        <img src={logo} style={{height: "7vh"}} alt="Hotels App" className="img-fluid img-thumbnail"/>
                    </RouterNavLink>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        { !this.props.isAuth
                            ? <> <NavigationItem link="/login"> Log In </NavigationItem>
                              <NavigationItem link="/signup"> Sign Up </NavigationItem> </>
                            : <NavigationItem link="/logout"> Logout </NavigationItem>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}

export default NavBar;
