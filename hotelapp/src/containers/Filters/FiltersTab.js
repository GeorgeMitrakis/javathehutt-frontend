import React, { Component } from 'react';

import { UncontrolledCarousel, Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';



import styles from './FiltersTab.module.css';
import PriceRange from './../../components/UI/PriceRange/PriceRange'
import AreaRange from './../../components/UI/AreaRange/AreaRange'

class FiltersTab extends React.Component{

    render(){
        return (
            <Container className={styles['filters_tab']}>
                <h3>Φίλτρα</h3>
                <div className={styles['price_range']}>
                    <p>Εύρος Τιμής</p>
                    <PriceRange />
                </div>
                <div className={styles['price_range']}>
                    <p>Εύρος Περοχής Αναζήτησης (km)</p>
                    <AreaRange />
                </div>
                
            </Container>
        );
    }
}

export default FiltersTab;