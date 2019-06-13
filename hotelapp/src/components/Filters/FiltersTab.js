import React, { Component } from 'react';

import { UncontrolledCarousel, Container, Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon,
    InputGroupText, InputGroupButtonDropdown, InputGroupDropdown,  Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Nav, NavItem, NavLink } from 'reactstrap';

import { Checkbox } from 'pretty-checkbox-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import produce from 'immer';


import './../../styles.scss';


import styles from './FiltersTab.module.css';
import PriceRange from './PriceRange/PriceRange';
import AreaRange from './AreaRange/AreaRange';

const filtersTab = (props) => {

    return (
        <Container className={styles['filters_tab']}>
            <h3 className={styles['header']} >Φίλτρα</h3>
            <InputGroup className={styles['searchArea']}>
                <Input placeholder="Αναζήτηση.." 
                    value = {props.searchText}
                    onChange={(event) => props.handleSearchText(event, props.searchFilters, props.searchInfo)}
                />
                <InputGroupAddon addonType="append"><Button color="link"><FontAwesomeIcon  icon={faSearch}  /></Button></InputGroupAddon>
            </InputGroup>
            <div className={styles['price_range']}>
                <p>Εύρος Τιμής</p>
                <PriceRange 
                    searchFilters = {props.searchFilters}
                    searchInfo = {props.searchInfo}
                    handlePriceRangeChange = {props.handlePriceRangeChange}
                />
            </div>
            <div className={styles['price_range']}>
                <p>Εύρος Περοχής Αναζήτησης (km)</p>
                <AreaRange 
                    searchFilters = {props.searchFilters}
                    searchInfo = {props.searchInfo}
                    handleAreaRangeChange = {props.handleAreaRangeChange}/>
            </div>
            <h3>Παροχές</h3>
            <Checkbox checked={props.searchFilters.facilities["breakfast"]} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => props.handlecheckBoxChange("breakfast", props.searchFilters, props.searchInfo)}>
                Πρωινό
            </Checkbox>
            <Checkbox checked={props.searchFilters.facilities["wifi"]} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => props.handlecheckBoxChange("wifi", props.searchFilters, props.searchInfo)}>
                Wi-Fi
            </Checkbox>
            <Checkbox checked={props.searchFilters.facilities["sauna"]} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => props.handlecheckBoxChange('sauna', props.searchFilters, props.searchInfo)}>
                Σάουνα
            </Checkbox>
            <Checkbox checked={props.searchFilters.facilities["pool"]} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => props.handlecheckBoxChange('pool', props.searchFilters, props.searchInfo)}>
                Πίσίνα
            </Checkbox>
        </Container>
    );
}


export default filtersTab;