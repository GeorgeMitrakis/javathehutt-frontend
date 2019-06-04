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

class FiltersTab extends React.Component{

    constructor(props) {
		super(props);
		
		this.priceRange = [0, 20];
		this.areaRange = 20;
        this.state = {
            searchText: "",
            facilities: {
                breakfast: false,
                wifi: false,
                pool: false,
                sauna: false
            }
        };

        //console.log(this.constructFromDate());
    }

    handleSearchText(event) {
        this.insertSearchText((event.target.value));//the things I do for an immutable state...
    }

    insertSearchText(text){
        this.setState(
            produce(draft => {
                draft.searchText = text;//this happens because event.target is not visible from draft
            })
        );
    }

    searchCritics = () => {
        console.log("Αναζητηση Critics");
        console.log(this.state);
        //axios request to send the search input
    }

    handlecheckBoxChange = (label) => {
        console.log("[FiltersTab.js]");
        console.log("Allakse kati se checkbox sto " + label);
    
        let facilitiesChanged = this.state.facilities;
        facilitiesChanged[label] = !this.state.facilities[label];
        this.setState({
            facilities: facilitiesChanged
        });
        console.log("Meta thn allagh sto checkbox " + label + " " + this.state.facilities[label]);
        //axios request to send the search input
    }

    handlePriceRangeChange = (value) => {
		console.log("Allakse to PRICE!!!");
		console.log(value);
        // this.setState(
        //     produce(draft => {
		// 		draft.priceRange = value;
		// 	})
		// );
		this.priceRange = value;
        console.log(this.priceRange);
        //axios request to send the search input
    };
    
    handleAreaRangeChange = (value) => {
        console.log("Allakse to AREA!!!");
		console.log(value);
        // this.setState(
        //     produce(draft => {
		// 		draft.areaRange = value;
		// 	})
		// );
		this.areaRange = value;
        console.log(this.areaRange);
        //axios request to send the search input
    };

    render(){
        return (
            <Container className={styles['filters_tab']}>
                <h3 className={styles['header']} >Φίλτρα</h3>
                <InputGroup className={styles['searchArea']}>
                    <Input placeholder="Αναζήτηση κριτικών.." 
                        onChange={this.handleSearchText.bind(this)}
                    />
                    <InputGroupAddon addonType="append"><Button color="link"><FontAwesomeIcon  icon={faSearch} onClick={this.searchCritics}  /></Button></InputGroupAddon>
                </InputGroup>
                <div className={styles['price_range']}>
                    <p>Εύρος Τιμής</p>
					<PriceRange 
						defaultValue={this.priceRange}
						handlePriceRangeChange = {this.handlePriceRangeChange}
					/>
                </div>
                <div className={styles['price_range']}>
                    <p>Εύρος Περοχής Αναζήτησης (km)</p>
					<AreaRange 
						defaultValue={this.areaRange}
						handleAreaRangeChange = {this.handleAreaRangeChange}/>
                </div>
                <h3>Παροχές</h3>
                <Checkbox className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {this.handlecheckBoxChange.bind(this, 'breakfast')}>
                  Πρωινό
                </Checkbox>
                <Checkbox className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {this.handlecheckBoxChange.bind(this, 'wifi')}>
                   Wi-Fi
                </Checkbox>
                <Checkbox className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {this.handlecheckBoxChange.bind(this, 'sauna')}>
                    Σάουνα
                </Checkbox>
                <Checkbox className={styles['checkbox']} shape="curve" color="primary" animation="smooth" onChange = {this.handlecheckBoxChange.bind(this, 'pool')}>
                   Πίσίνα
                </Checkbox>
            </Container>
        );
    }
}

export default FiltersTab;