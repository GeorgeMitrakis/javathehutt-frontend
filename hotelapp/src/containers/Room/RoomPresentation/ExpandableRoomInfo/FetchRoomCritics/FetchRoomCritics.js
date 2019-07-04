import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Spinner } from 'reactstrap';
import { Get } from 'react-axios';
import RoomCritic from './RoomCritic/RoomCritic';


class FetchRoomCritics extends React.Component {

    render() {
        const dummyCritics = [
            {
                stars: 1,
                comment: "Search for the keywords to learn more about each warning.To ignore, add // eslint-disable-next-line to the line before."
            },

            {
                stars: 5,
                comment: "Search for the keywords to learn more about each warning.To ignore, add //Search for the keywords to learn more about each warning.ToSearch for the keywords to learn more about each warning.To eslint-disable-next-line to the line before."
            },

            {
                stars: 3,
                comment: "Search for the keywords to learn more about each warning.To ignore, add // eslint-disable-next-line to the line before."
            }

        ];

        return (

            <Get url="http://localhost:8765/app/api/ratings" params={{roomId: this.props.roomId}}>
                {(error, response, isLoading, makeRequest, axios) => {
                    if (error) {
                        const feedback = (
                            <Row className="justify-content-center">
                                <div className="text-muted align-self-center pointer font-italic" onClick={() => makeRequest({ params: { reload: true } })}> 
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
                        console.log("-------------------------------");
                        console.log(response);
                        // alert(response.data.data.results[0].id);
                        // response.data.data = null;
                        console.log(response);
                        const noResults = (
                            <Row className={"justify-content-center p-4"}>
                                <div className="text-muted align-self-center font-italic"> 
                                    Δεν υπάρχουν διαθέσιμες κριτικές για το συγκεκριμένο δωμάτιο. 
                                </div>
                            </Row>
                        );

                        // if ( true || ((response.data.data) && (response.data.data.ratings) && (response.data.data.ratings.length)))
                        if ((response.data.data) && (response.data.data.ratings) && (response.data.data.ratings.length))
                        {
                            // const roomCritics = dummyCritics.map( (roomCritic, i) =>
                            const roomCritics = response.data.data.ratings.map( (roomCritic, i) =>
                                <RoomCritic 
                                    key={this.props.roomId + "_" + i}
                                    roomCritic={roomCritic}
                                />
                            );

                            return roomCritics;
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


export default withRouter(FetchRoomCritics);
