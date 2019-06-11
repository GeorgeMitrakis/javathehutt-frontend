import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import { Row, Col,Input ,Container,Card,CardTitle} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import produce from 'immer';
import myInput from '../../components/UI/MyInput/MyInput';
import submitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import classes from './Administration.module.css';

import UserViewElem from '../../components/User/Admin/UserViewElem'
import UserViewResults from '../../components/User/Admin/UserViewResults'
//import SearchForm from '../SearchForm/SearchForm';
//import Login from '../Login/Login';
//import Signup from '../Signup/Signup';



class UserView extends React.Component {

    handleKeyPress = (e) => {
        
        if (e.key === 'Enter') {
            this.searchUsers();  
        }
    }

    handleSearchPressed = (e) => {
        
        this.searchUsers();
    }
    renderUser(u){

        return <>
        </>
    }
    
    ban(e){
        const id = e.target.value;
        if(!window.confirm(`Ban user ${id}?`)) return;
        let data = {
            'option':"ban",
            "id":id
        };
        
        axios.post(
            "http://localhost:8765/app/api/admin",
            qs.stringify(data),
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            alert("Ban Submitted");
            if(result.data.success){
                alert("ban Submitted - ok");
            }else{
                alert("ban Submitted - fail");
            }
            
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    unban(e){
        const id = e.target.value;
        if(!window.confirm(`Unban user ${id}?`)) return;
        let data = {
            'option':"unban",
            "id":id
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
                alert("Unban Submitted - ok");
            }else{
                alert("Unban Submitted - fail");
            }
            
        })
        .catch((err) => {
            console.log(err);    
        })
    }

    promote(e){
        const id = e.target.value;
        if(!window.confirm(`Promote user ${id}?`)) return;
        let data = {
            'option':"unban",
            "id":id
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
                alert("prom Submitted - ok");
            }else{
                alert("prom Submitted - fail");
            }
            
        })
        .catch((err) => {
            console.log(err);    
        })
    }

    constructor(props) {
		super(props);
        this.state = {
            searchStr:'',
            users:[]
		}
		this.getAllUsers();
        
    }

    searchChanged = (e) =>{
        //console.log(window.location.pathname);
        this.setState({searchStr:e.target.value});
	}
	
	getAllUsers = () => {
		axios.get(
			"http://localhost:8765/app/api/users",			
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
        )
        .then((result) => {            
			if(result.data.success){
				console.log(result.data.data);
           		console.log(result.data);
				console.log(result);
				this.setState(
					produce(draft => {					
					draft.users = result.data.data.users;
				}));
			}
			else{
				console.log(result.data.message);
			}
            
        })
        .catch((err) => {
            console.log(err);    
		})
	}

    searchUsers(){
        if(this.state.searchStr === ''){
            return;
        }
	   
        axios.get(
			"http://localhost:8765/app/api/users",
			{
				params:{
					'email':this.state.searchStr
				}
			},			
			{
				'Content-Type': 'application/x-www-form-urlencoded'
			}
        )
        .then((result) => {
			if(result.data.success){
				console.log(result.data.data);
				console.log(result.data);
				console.log(result);
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
				console.log(result.data.message);
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
								onChange={this.searchChanged.bind(this)} 
								value={this.state.searchStr} 
								onKeyPress={this.handleKeyPress.bind(this)}
								className="form-control form-control-sm"
								placeholder="Search users..."
							>
							</input>
						</Col>
						<Col className="col-xs-4 col-sm-2 col-md-2 col-lg-2 offset-xs-8">
							<button type="submit" className="btn btn-primary btn-sm" onClick={this.handleSearchPressed.bind(this)}>Αναζητηση</button>
						</Col>
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
