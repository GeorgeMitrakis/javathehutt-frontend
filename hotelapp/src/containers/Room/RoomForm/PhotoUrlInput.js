import React, { Component } from 'react';
import { Container, Col,  Modal, Form, FormGroup, Label, Input, FormText, Row, Button } from 'reactstrap';

import MyInput from '../../../components/UI/MyInput/MyInput'

class PhotoUrlInput extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            inputList: [{url: ''}] 
        };
    }

    


    handleUrlChange = idx => evt => {
        const newUrl = this.state.inputList.map((url, sidx) => {
            if (idx !== sidx) return url;
            return { ...url, name: evt.target.value };
        });

        this.setState({ inputList: newUrl });
        console.log(this.state)
    };


    handleRemoveUrl = idx => () => {
        this.setState({
            inputList: this.state.inputList.filter((s, sidx) => idx !== sidx)
        });
    };

    handleUrlChange = idx => event => {
        const newUrl = this.state.inputList.map((url, sidx) => {
            if (idx !== sidx) return newUrl;
            return { ...url, url: event.target.value };
        });
    }
    

    handleAddUrl = () => {
        this.setState({
            inputList: this.state.inputList.concat([{ url: '' }])
        });
    }
    
    render(){
        return (
            <>
                {this.state.inputList.map((url, idx) => (
                    <Row className="url">
                        <Col xs={10} sm={10} style={{'marginBottom': '7px'}}>
                            <Input
                                type="text"
                                placeholder={`Paste link of photo #${idx + 1}`}
                                value={url.name}
                                onChange={this.handleUrlChange(idx)}
                            />
                        </Col>
                        <Col xs={2} sm={2}>
                            <Button
                                color="danger"
                                type="button"
                                onClick={this.handleRemoveUrl(idx)}
                                className="small"
                                > <i className="fas fa-minus-circle"></i> </Button>
                    </Col>
                </Row>
                ))}
                <Button
                    color="success"
                    type="button"
                    onClick={this.handleAddUrl}
                    className="small"
                ><i className="fas fa-plus-square"></i></Button>
            </>
        );
    }
}

export default PhotoUrlInput;