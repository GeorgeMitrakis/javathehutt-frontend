import React, { Component } from 'react';

import { Container, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { Checkbox } from 'pretty-checkbox-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
//import produce from 'immer';


import './../../styles.scss';


import styles from './FiltersTab.module.css';
import PriceRange from './PriceRange/PriceRange';
import AreaRange from './AreaRange/AreaRange';

const filtersTab = (props) => {

    return (
        <Container fluid className={styles['filters_tab']}>
            <Container>
            <InputGroup className={styles['searchArea']}>
                <Input placeholder="Αναζήτηση.." 
                    value = {props.searchText}
                    onChange={(event) => props.handleSearchText(event, props.searchFilters, props.searchInfo)}
                />
                <InputGroupAddon addonType="append"><Button color="link"><FontAwesomeIcon  icon={faSearch}  /></Button></InputGroupAddon>
            </InputGroup>
            </Container>
            <Container className={styles['price_range']}>
                <p>Εύρος Τιμής</p>
                <PriceRange 
                    searchFilters = {props.searchFilters}
                    searchInfo = {props.searchInfo}
                    handlePriceRangeChange = {props.handlePriceRangeChange}
                />
            </Container>
            <Container className={styles['price_range']}>
                <p>Εύρος Περοχής Αναζήτησης (km)</p>
                <AreaRange 
                    searchFilters = {props.searchFilters}
                    searchInfo = {props.searchInfo}
                    handleAreaRangeChange = {props.handleAreaRangeChange}/>
            </Container>
            <Container>
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
        </Container>
    );
}


export default filtersTab;