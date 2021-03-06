import React from 'react';
//import { Route } from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import { Row, Col, Container } from 'reactstrap';
//import Button from 'reactstrap/lib/Button';
import produce from 'immer';
//import myInput from '../../../components/UI/MyInput/MyInput';
//import SubmitBtn from '../../../components/UI/SubmitBtn/SubmitBtn';
//import classes from './Administration.module.css';

//import UserViewElem from '../../../components/User/Admin/UserViewElem'
import UserViewResults from '../../../components/User/Admin/UserViewResults'
//import SearchForm from '../SearchForm/SearchForm';
//import Login from '../Login/Login';
//import Signup from '../Signup/Signup';



class UserView extends React.Component {

    constructor(props) {
		super(props);
		this.searchStr = React.createRef();
        this.state = {
			users : []
		}
		this.ban = this.ban.bind(this);
		this.unban = this.unban.bind(this);
		this.searchUsers = this.searchUsers.bind(this);
        
	}

	componentDidMount(){
		this.searchUsers();
	}

	handleChange = (event) => {
		event.preventDefault(); 
		this.searchUsers();
	}

    searchUsers = () => {
		console.log(this.searchStr.current.value);
		axios.get(
			"http://localhost:8765/app/api/users",
			{
				params:{
					'emailPrefix':this.searchStr.current.value
				}
			},			
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
        )
        .then((result) => {
			if(result.data.success){
				console.log(result.data.data);
				// console.log(result.data);
				// console.log(result);
				this.setState(
					produce(draft => {					
					draft.users = result.data.data.users;
				}));
			}
			else{
				this.setState(
					produce(draft => {					
					draft.users = [];
				}));
				console.log(result.data.message+".then()");
				console.log(result);
			
			}
            
        })
        .catch((err) => {
			console.log(err+".err()"); 
			this.setState(
				produce(draft => {					
				draft.users = [];
			}));   
        })
	}
	
	

    ban(u){
        //const id = e.target.value;
        if(!window.confirm(`Μπανάρισμα του χρήστη ${u.email}?`)) return;
        let data = {
            'option':"ban",
            "id":u.id
        };
        
        axios.post(
            "http://localhost:8765/app/api/admin",
            qs.stringify(data),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            if(result.data.success){
				//window.scrollTo(0, 0);
				this.props.alert("Ο χρήστης με email :\""+u.email+"\" δικάστηκε.");

				this.searchUsers();
            }else{
                alert("ban Submitted - fail");
			}

        })
        .catch((err) => {
            console.log(err);
            
		})		

		
    }

    unban(u){
        if(!window.confirm(`Ξε-μπανάρισμα του χρήστη ${u.email}?`)) return;
        let data = {
            'option':"unban",
            "id":u.id
        };
        axios.post(
            "http://localhost:8765/app/api/admin",
            qs.stringify(data),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
           
            if(result.data.success){
				this.props.alert("Ο χρήστης με email :\""+u.email+"\" πήρε δεύτερη ευκαιρία.");
				
				this.searchUsers();
            }else{
                alert("Unban Submitted - fail");
			}
            
        })
        .catch((err) => {
            console.log(err);    
		})
		
    }

    promote(u){
        //const id = e.target.value;
        if(!window.confirm(`Προαγωγή του χρήστη ${u.email} σε διαχειριστή;`)) return;
        let data = {
            'option':"promote",
            "id":u.id
        }
        axios.post(
            "http://localhost:8765/app/api/admin",
            qs.stringify(data),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            console.log(result);
            if(result.data.success){
				//alert("prom Submitted - ok");
				this.props.alert("Ο χρήστης με email :\""+u.email+"\" πήρε σφυράκι.");
					
				this.searchUsers();
            }else{
                alert("prom Submitted - fail.\nReason:"+result.data.message);
            }
            
        })
        .catch((err) => {
            console.log(err);    
		})
		
		
    }
	
	

    render() {

        return (
            <>
				<Container className = "mt-4 p-2">
						<Row>
							<Col className="col-xs-8 col-sm-8 col-md-6 col-lg-5 offset-sm-1 offset-md-3 offset-lg-3">
								<input
									type='text'
									ref={this.searchStr} 
									className="form-control form-control-sm"
									placeholder="Εισάγετε email χρήστη..."
									defaultValue=""
									onChange={(event)=> this.handleChange(event)}
								/>
							</Col>
							{/* <Col className="col-xs-4 col-sm-2 col-md-2 col-lg-2 offset-xs-8">
								<button type="submit" className="btn btn-primary btn-sm">
									Αναζητηση
								</button>
							</Col> */}
						</Row>
				
						<UserViewResults
							users={this.state.users}
							promote={this.promote}
							ban={this.ban}
							unban={this.unban}
						/>
											
				</Container>                               
            </>  
        );
    }

}

export default UserView;
