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
import PriceRange from './../../components/UI/PriceRange/PriceRange'
import AreaRange from './../../components/UI/AreaRange/AreaRange'

const filtersTab = (props) => {

        return (
            <Container className={styles['filters_tab']}>
                <h3 className={styles['header']} >Φίλτρα</h3>
                <InputGroup className={styles['searchArea']}>
                    <Input placeholder="Αναζήτηση.." 
                        value = {props.searchText}
                        onChange={(event) => props.handleSearchText(event)}
                    />
                    <InputGroupAddon addonType="append"><Button color="link"><FontAwesomeIcon  icon={faSearch}  /></Button></InputGroupAddon>
                </InputGroup>
                <div className={styles['price_range']}>
                    <p>Εύρος Τιμής</p>
					<PriceRange 
						defaultValue={props.priceRange}
						handlePriceRangeChange = {props.handlePriceRangeChange}
					/>
                </div>
                <div className={styles['price_range']}>
                    <p>Εύρος Περοχής Αναζήτησης (km)</p>
					<AreaRange 
						defaultValue={props.areaRange}
						handleAreaRangeChange = {props.handleAreaRangeChange}/>
                </div>
                <h3>Παροχές</h3>
                <Checkbox checked={props.facilitiesFlags["breakfast"]} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => props.handlecheckBoxChange("breakfast")}>
                  Πρωινό
                </Checkbox>
                <Checkbox  checked={props.facilitiesFlags["wifi"]} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => props.handlecheckBoxChange("wifi")}>
                   Wi-Fi
                </Checkbox>
                <Checkbox checked={props.facilitiesFlags["sauna"]} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => props.handlecheckBoxChange('sauna')}>
                    Σάουνα
                </Checkbox>
                <Checkbox checked={props.facilitiesFlags["pool"]} className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {() => props.handlecheckBoxChange('pool')}>
                   Πίσίνα
                </Checkbox>
            </Container>
        );
    }


export default filtersTab;