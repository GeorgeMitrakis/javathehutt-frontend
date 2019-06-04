import React, { Component } from 'react';

import { UncontrolledCarousel, Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';

import { Checkbox } from 'pretty-checkbox-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'



import './../../styles.scss';


import styles from './FiltersTab.module.css';
import PriceRange from './../../components/UI/PriceRange/PriceRange'
import AreaRange from './../../components/UI/AreaRange/AreaRange'

class FiltersTab extends React.Component{

    render(){
        return (
            <Container className={styles['filters_tab']}>
                <h3 className={styles['header']} >Φίλτρα</h3>
                <InputGroup className={styles['searchArea']}>
                    <Input placeholder="Αναζήτηση κριτικών.." />
                    <InputGroupAddon addonType="append"><Button color="link"><FontAwesomeIcon  icon={faSearch} /></Button></InputGroupAddon>
                    
                </InputGroup>
                <div className={styles['price_range']}>
                    <p>Εύρος Τιμής</p>
                    <PriceRange />
                </div>
                <div className={styles['price_range']}>
                    <p>Εύρος Περοχής Αναζήτησης (km)</p>
                    <AreaRange />
                </div>
                <h3>Παροχές</h3>
                <Checkbox className={styles['checkbox']} shape="curve" color="primary" animation="smooth">
                  Πρωινό
                </Checkbox>
                <Checkbox className={styles['checkbox']} shape="curve" color="primary" animation="smooth">
                   Wi-Fi
                </Checkbox>
                <Checkbox className={styles['checkbox']} shape="curve" color="primary" animation="smooth">
                    Σάουνα
                </Checkbox>
                <Checkbox className={styles['checkbox']} shape="curve" color="primary" animation="smooth">
                   Πίσίνα
                </Checkbox>
            </Container>
        );
    }
}

export default FiltersTab;