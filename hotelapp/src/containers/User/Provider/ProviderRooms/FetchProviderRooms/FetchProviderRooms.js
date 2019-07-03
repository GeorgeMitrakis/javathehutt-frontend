import React, { Component } from 'react';
import { Container, Col, Row, Button,  Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Get, Post } from 'react-axios';
import { Spinner } from 'reactstrap';
import produce from 'immer';
import RoomForm from '../../../../Room/RoomForm/RoomForm';
import RoomPresentation from '../../../../Room/RoomPresentation/RoomPresentation';




class FetchProviderRooms extends React.Component{

    shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.reRender !== this.props.reRender)
        {
            return true;
        }
        else
        {
           return false;
        }

    }

    render(){
        return (
            <Get url="http://localhost:8765/app/api/rooms" params={{
                providerId: JSON.parse(localStorage.getItem('userInfo'))["id"]}}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        const feedback = (
                            <Row className="justify-content-center">
                                <div className="text-muted align-self-center pointer" onClick={() => makeRequest({ params: { reload: true } })}> 
                                    Υπήρξε πρόβλημα με τη σύνδεση σας. Δοκιμάστε ξανά
                                    <i className="fas fa-redo-alt pointer ml-2"></i>
                                </div>
                            </Row>
                        );
                        return feedback;
                        // return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                    }
                    else if (isLoading) {
                        return (
                            <Row className="justify-content-center">
                                <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
                            </Row>
                        );
                    }
                    else if (response !== null) {
                        console.log(response);
                            // alert(response.data.data.results[0].id);
                            // response.data.data = null;
                        const noResults = (
                            <Row className={"justify-content-center p-4 "}>
                                <div className="text-muted align-self-center"> Δεν βρέθηκαν καταχωρημένα δωμάτια. </div>
                            </Row>
                        );

                        if ((response.data.data) && (response.data.data.rooms))
                        {
                            const providerRooms = response.data.data.rooms.map(room =>
                                <RoomPresentation
                                    key={room.id}
                                    renderProvFuncs={true}
                                    deleteRoomModalHandler={ () => this.props.deleteRoomModalHandler(room) }
                                    editRoomModalHandler={ () => this.props.editRoomModalHandler(room) }
                                    room={room} 
                                />
                            );

                            if (providerRooms.length)
                            {
                                return providerRooms;
                            }
                            else
                            {
                                return noResults;
                            }
                        }
                        else
                        {
                            return noResults;
                        }
                    }

                    return null;
                }}
            </Get>
            
        );
    }
}

export default FetchProviderRooms;