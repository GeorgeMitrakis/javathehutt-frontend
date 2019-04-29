import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import classes from './Admin.module.css';
import { Row, Input } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import produce from 'immer';
import myInput from '../../components/UI/MyInput/MyInput';
import submitBtn from '../../components/UI/SubmitBtn/SubmitBtn';
//import SearchForm from '../SearchForm/SearchForm';
//import Login from '../Login/Login';
//import Signup from '../Signup/Signup';



class UserView extends React.Component {

    renderUser(u){
        
        return <>

        <div>
            <strong> {u.email} </strong>
            {
               u.banned ? 
               (<>
                <button value={u.id}  onClick={this.unban} > Unban </button>
               </>) 
               : 
               (<>
               <button value={u.id} onClick={this.ban}> Ban </button>
               </>)
            }

            <button value={u.id} onClick={this.promote}>
                Promote to admin
            </button>
        </div>
            
            
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

    searchChanged(e){
        this.setState({searchStr:e.target.value});
    }
    searchUsers(e){

       
        axios.get(
            "http://localhost:8765/....",
            {
               'query':this.state.searchStr
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
                
                <div className="jumbotron" id="userview">
                    
                    <input type='text' onChange={this.searchChanged.bind(this)} value={this.state.searchStr}></input>
                    <button color='primary' onClick={this.searchUsers.bind(this)}>Αναζητηση</button>
                    {
                        this.state.testData.map( (u,i) => {
                            return <ul key={i}> {this.renderUser(u)} </ul>
                        })
                    }

                </div>
                
            </>
  
        );
    }

}

export default UserView;
