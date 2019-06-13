import React from 'react';
import { Row, Col,Input ,Container,Card,CardTitle} from 'reactstrap';


const userViewElem = (props) => {
	return(
		<Row>
			<Col className="bg-white col-lg-6 offset-lg-3 mt-3">
				<Card outline color="secondary" className="p-2  bg-white">
					
					<Container>
						<Row>
							<Col>
								<h3>{props.u.email}</h3>
							
							</Col>
						</Row>
						<Row>
							<Col className="col-lg-4">
								<button className="btn btn-info btn-sm btn-block" value={props.u.id} onClick={props.promote}>
									Promote to admin
								</button>
							</Col>
							<Col className="col-lg-4">
								<button value={props.u.id} onClick={props.u.banned ? props.ban : props.unban} className="btn btn-danger btn-sm btn-block " > 
								{!props.u.banned ? "Ban":"Unban"} 
								</button>
							</Col>
						</Row>    
					</Container>
					
				</Card>
			</Col>
		</Row>
	);
}

export default userViewElem;