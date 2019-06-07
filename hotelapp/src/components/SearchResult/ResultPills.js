import React from 'react';

import { Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';

import styles from './Result.module.css';

class Pills extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <Nav pills >
                    <NavItem  className={styles['pills-style']}>
                        <NavLink href="#" active>Πληροφορίες</NavLink>
                    </NavItem>
                    <NavItem  className={styles['pills-style']}>
                        <NavLink href="#" >Εικόνες</NavLink>
                    </NavItem>
                    <NavItem  className={styles['pills-style']}>
                        <NavLink href="#" >Κρητικές</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
}

export default Pills;