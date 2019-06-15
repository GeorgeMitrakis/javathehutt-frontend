import React from 'react';
import { NavLink as RouterNavLink }  from 'react-router-dom';
import classes from './NavBar.module.css';
import logo from '../../../assets/images/dummy_logo.png';
import NavigationItem from '../../../components/Navigation/NavigationItem/NavigationItem';
import { getUserInfoField } from '../../../Utility/Utility';
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

	
	adminNav = () => {
		return(
			<>
				<NavigationItem link="/admin"> Διαχείριση Πλατφόρμας </NavigationItem>
				<NavigationItem link="/admin/profile"> Επεξεργασία Προφίλ </NavigationItem>
				<NavigationItem link="#"> Αλλαγή Κωδικού </NavigationItem>		
				<NavigationItem link="/logout"> Αποσύνδεση </NavigationItem>								
			</>
		);
	}
	
	visitorNav = () => {
		return(
			<>
				<NavigationItem link="#"> Αγαπημένα </NavigationItem>
				<NavigationItem link="#"> Επεξεργασία Προφίλ </NavigationItem>
				<NavigationItem link="#"> Αλλαγή Κωδικού </NavigationItem>		
				<NavigationItem link="/logout"> Αποσύνδεση </NavigationItem>								
			</>
		);
	}
	
	providerNav = () => {
		return(
			<>
				<NavigationItem link="#"> Επεξεργασία Προφίλ </NavigationItem>
				<NavigationItem link="#"> Αλλαγή Κωδικού </NavigationItem>		
				<NavigationItem link="/logout"> Αποσύνδεση </NavigationItem>								
			</>
		);
	}
	
	guestNav = () => {
		return(
			<>
				<NavigationItem link="/login"> Είσοδος </NavigationItem>
				<NavigationItem link="/signup"> Εγγραφή </NavigationItem> 
			</>
		);
	}

	navItems = () => {
		console.log("----------------");
		console.log(this.props.isAuth);
		console.log("----------------");
		console.log(this.props.role);
		console.log("----------------");
		
		if(!this.props.isAuth){
			return this.guestNav();
		}
		else if(this.props.role === "admin"){
			return this.adminNav();
		}
		else if(this.props.role === "visitor"){
			return this.visitorNav();
		}
		else if(this.props.role === "provider"){
			return this.providerNav();
		}
		else{
			return this.guestNav();
		}
	}


    render() {
        return (
        <div>
            <Navbar light expand="sm" className="fixed-top primary_bg_color" >
                <RouterNavLink to="/" exact>
                    <img src={logo} style={{height: "7vh"}} alt="Hotels App" className="img-fluid img-thumbnail"/>
                </RouterNavLink>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {this.navItems()}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}

export default NavBar;
