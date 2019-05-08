import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import { Row, Input } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import produce from 'immer';
import myInput from '../../components/UI/MyInput/MyInput';
import submitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
import classes from './Admin.module.css';
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
        
        axios.put(
            "http://localhost:8765/....",
            {
                'action':"ban",
                "userid":id
            },
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            alert("Ban Submitted");
            
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    unban(e){
        const id = e.target.value;
        if(!window.confirm(`Unban user ${id}?`)) return;
        
        axios.put(
            "http://localhost:8765/....",
            {
                'action':"unban",
                "userid":id
            },
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            alert("Unban Submitted");
            
        })
        .catch((err) => {
            console.log(err);    
        })
    }

    promote(e){
        const id = e.target.value;
        if(!window.confirm(`Promote user ${id}?`)) return;
        
        axios.put(
            "http://localhost:8765/....",
            {
                'action':"promote",
                "userid":id
            },
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        )
        .then((result) => {
            alert("Promote Submitted");
            
        })
        .catch((err) => {
            console.log(err);    
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            'searchStr':'',
            'testData':[]
        }
        
    }

    searchChanged = (e) =>{
        this.setState({searchStr:e.target.value});
    }
    searchUsers = () =>{
        if(this.state.searchStr === ''){
            return;
        }
       
        axios.get(
            "http://localhost:8765/app/api/dummy?field=users"
        )
        .then((result) => {
            alert("Promote Submitted");
            
        })
        .catch((err) => {
            console.log(err);    
        })
        
        this.setState(produce(draft=>{
            draft.testData = [
                {
                    "id":1,
                    "email": "test@email.com",
                    "role": "visitor",
                    "banned": false
                },
                {
                    "id":2,
                    "email": "testem@ail1.com",
                    "role": "provider",
                    "banned": true
                },
                {
                    "id":3,
                    "email": "testem@ail2.com",
                    "role": "provider",
                    "banned": true
                },
                {
                    "id":4,
                    "email": "testem@ail3.com",
                    "role": "provider",
                    "banned": false
                },
                {
                    "id":5,
                    "email": "testem@ail4.com",
                    "role": "provider",
                    "banned": true
                }
            ]
        }))
    }

    render() {

        return (
            <>
                
                
                    <Row className = "mt-4 col-lg-10 offset-lg-3">
                        <input 
                            type='text'
                            onChange={this.searchChanged.bind(this)} 
                            value={this.state.searchStr} 
                            onKeyPress={this.handleKeyPress.bind(this)}
                            className="form-control form-control-sm  col-lg-4"
                            placeholder="Seach users..."
                        >
                        </input>
                        <button type="submit" className="btn btn-primary btn-sm col-lg-2" onClick={this.handleSearchPressed.bind(this)}>Αναζητηση</button>
                    </Row>
                    <div   id={classes.userframe}>
                        {
                            this.state.testData.map( (u,i) => {
                                return <>
                                <div className={classes.user + "  bg-white"} key={i}>
                                    <p className="h4 "> {u.email} </p>
                                    
                                    <button className="btn btn-info btn-sm " value={u.id} onClick={this.promote}>
                                        Promote to admin
                                    </button>
                                    
                                    
                                    {
                                    u.banned ? 
                                    (<>
                                        <button value={u.id}  onClick={this.unban} className="btn btn-danger btn-sm  col-lg-2"> Unban </button>
                                    </>) 
                                    : 
                                    (<>
                                    <button value={u.id} onClick={this.ban} className="btn btn-danger btn-sm  col-lg-2" > Ban </button>
                                    </>)
                                    }

                                    
                                </div>

                                </>
                            })
                        }
                    </div>
               
                
            </>
  
        );
    }

}

export default UserView;
