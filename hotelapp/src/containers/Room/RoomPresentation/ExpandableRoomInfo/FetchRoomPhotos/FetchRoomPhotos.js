import React from 'react';
import { withRouter } from 'react-router-dom';
import { UncontrolledCarousel, Row, Spinner } from 'reactstrap';
import { Get } from 'react-axios';


class FetchRoomPhotos extends React.Component {


    render() {
        // const items = [
        //     {
        //     src:"http://localhost:8765/app/api/img?roomId=55",
        //     //   src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        //       altText: 'Slide 1',
        //       caption: ""
        //     },
        //     {
        //       src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        //       altText: 'Slide 2',
        //       caption: ""
        //     },
        //     {
        //       src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        //       altText: 'Slide 3',
        //       caption: ""
        //     }
        //   ];

        return (

            <Get url="http://localhost:8765/app/api/roomImages" params={{roomId: this.props.roomId}}>
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
                        console.log(response);
                        // alert(response.data.data.results[0].id);
                        // response.data.data = null;
                        console.log(response);
                        const noResults = (
                            <Row className={"justify-content-center p-4"}>
                                <div className="text-muted align-self-center font-italic"> 
                                    Δεν βρέθηκαν καταχωρημένες φωτογραφίες για το συγκεκριμένο δωμάτιο. 
                                </div>
                            </Row>
                        );

                        if ((response.data.data) && (response.data.data.ids))
                        {
                            if (response.data.data.ids.length)
                            {
                                let carouselItems = [];
                                response.data.data.ids.forEach((imgId, i) => { 
                                    carouselItems.push({
                                        src: "http://localhost:8765/app/api/img?imgId=" + imgId,
                                        altText: 'Slide ' + (i+1),
                                        caption: ""
                                    });
                                });

                                console.log(carouselItems);

                                return (
                                    <UncontrolledCarousel items={carouselItems} />
                                );
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

export default withRouter(FetchRoomPhotos);

