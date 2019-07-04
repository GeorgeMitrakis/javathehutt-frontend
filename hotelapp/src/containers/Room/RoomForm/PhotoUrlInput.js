import React, { Component } from 'react';
import { Container, Col,  Modal, Form, FormGroup, Label, Input, FormText, Row, Button } from 'reactstrap';

import MyInput from '../../../components/UI/MyInput/MyInput'

class PhotoUrlInput extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            inputList: [{url: ''}] 
        };
        this.incrementCount = this.incrementCount.bind(this);
        this.decrementCount = this.decrementCount.bind(this);
    }

    incrementCount() {
      const inputList = this.state.inputList;
        this.setState({
            count: this.state.count + 1,
            inputList: inputList.concat(<FormGroup row>
                <Label for="extras" sm={2}>Φωτογραφία {this.count}</Label>
                <Col sm={10}>
                    <Input className="add-more"  placeholder="Type1">
                        
                    </Input>
                </Col>
            </FormGroup>),
        });
    }
    decrementCount() {
      const inputList = this.state.inputList;
        this.setState({
            count: this.state.count - 1,
            inputList: inputList.concat(
            ),
        });
    }


    handleUrlChange = idx => evt => {
        const newUrl = this.state.shareholders.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, name: evt.target.value };
        });

        this.setState({ url: newUrl });
    };


    handleRemoveUrl = idx => () => {
        this.setState({
            inputList: this.state.inputList.filter((s, sidx) => idx !== sidx)
        });
    };

    handleUrlChange = idx => event => {
        const newUrl = this.state.shareholders.map((url, sidx) => {
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
                {this.state.inputList.map((shareholder, idx) => (
                    <Row className="shareholder">
                        <Col xs={10} sm={10} style={{'margin-bottom': '7px'}}>
                            <Input
                                type="text"
                                placeholder={`Paste link of photo #${idx + 1}`}
                                value={shareholder.name}
                                onChange={this.handleUrlChange(idx)}
                            />
                        </Col>
                        <Col xs={2} sm={2}>
                            <Button
                                color="danger"
                                type="button"
                                onClick={this.handleRemoveUrl(idx)}
                                className="small"
                                > <i class="fas fa-minus-circle"></i> </Button>
                    </Col>
                </Row>
                ))}
                <Button
                    color="success"
                    type="button"
                    onClick={this.handleAddUrl}
                    className="small"
                ><i class="fas fa-plus-square"></i></Button>
            </>
        );
    }
}

export default PhotoUrlInput;