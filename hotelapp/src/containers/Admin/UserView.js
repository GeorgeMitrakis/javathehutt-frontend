import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import { Row, Col,Input ,Container,Card,CardTitle} from 'reactstrap';
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
        console.log(window.location.pathname);
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

                    <Container className = "mt-4 p-2">
                        <Row>
                            <Col className="col-xs-8 col-sm-8 col-md-6 col-lg-5 offset-sm-1 offset-md-3 offset-lg-3">
                                <input 
                                    type='text'
                                    onChange={this.searchChanged.bind(this)} 
                                    value={this.state.searchStr} 
                                    onKeyPress={this.handleKeyPress.bind(this)}
                                    className="form-control form-control-sm"
                                    placeholder="Seach users..."
                                >
                                </input>
                            </Col>
                            <Col className="col-xs-4 col-sm-2 col-md-2 col-lg-2 offset-xs-8">
                                <button type="submit" className="btn btn-primary btn-sm" onClick={this.handleSearchPressed.bind(this)}>Αναζητηση</button>
                            </Col>
                        </Row>
                    
                            
                        {
                            this.state.testData.map( (u,i) => {
                                return <>
                                <Row>
                                    <Col className="bg-white col-lg-6 offset-lg-3 mt-3" key={i}>
                                        <Card outline color="secondary" className="p-2  bg-white">
                                            
                                            <Container>
                                                <Row>
                                                    <Col>
                                                        <h3>
                                                            {u.email}
                                                        </h3>
                                                    
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col className="col-lg-4">
                                                        <button className="btn btn-info btn-sm btn-block" value={u.id} onClick={this.promote}>
                                                            Promote to admin
                                                        </button>
                                                    </Col>
                                                    <Col className="col-lg-4">
                                                        <button value={u.id} onClick={u.banned ? this.ban : this.unban} className="btn btn-danger btn-sm btn-block " > 
                                                        {u.banned ? "Ban":"Unban"} 
                                                        </button>
                                                    </Col>
                                                </Row>    
                                            </Container>
                                            
                                        </Card>
                                    </Col>
                                </Row>
                                </>
                            })
                        }
                        
                    </Container>
               
                
            </>
  
        );
    }

}

export default UserView;
