import React from 'react';
import { Row } from 'reactstrap';
import { Get } from 'react-axios';
import { Spinner } from 'reactstrap';
//import produce from 'immer';
//import RoomForm from '../../../../Room/RoomForm/RoomForm';
import RoomPresentation from '../../../../Room/RoomPresentation/RoomPresentation';
import { getUserInfoField } from '../../../../../Utility/Utility';
import styles from '../ProviderRooms.module.css';



class FetchProviderRooms extends React.Component{

    shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.reFetchRooms !== this.props.reFetchRooms)
        {
            return true;
        }
        else
        {
           return false;
        }

    }

    render(){
        // alert("RENDER fetch provider rooms");
        const params={};
        // params["providerId"] = JSON.parse(localStorage.getItem('userInfo'))["id"];
        params["providerId"] = getUserInfoField("id");
        params["toggleReFetch"] = this.props.reFetchRooms;

        return (
            <Get url="http://localhost:8765/app/api/rooms" params={params}>
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
                            <Row className={"justify-content-center p-4 " + styles.box_border}>
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
                                    photoInsertHandler={ () => this.props.photoInsertHandler()}
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