import React from 'react';
import { Row, Col,Container,Card} from 'reactstrap';


const userViewElem = (props) => {
	return(
		<Row>
			<Col className="bg-white col-lg-6 offset-lg-3 mt-3">
				<Card outline color="secondary" className="p-2  bg-white">
					
					<Container>
						<Row>
							<Col>
								<p>#{props.u.id} </p>
								<p>{props.u.email}</p>
								<p>{props.u.role}</p>
							
							</Col>
						</Row>
						<Row>
							<Col className="col-lg-4">
								<button 
									className="btn btn-info btn-sm btn-block" 
									value={props.u.id} 
									onClick={() => props.promote(props.u)}
									>
									Promote to admin
								</button>
							</Col>
							<Col className="col-lg-4">
								<button 
									value={props.u.id} 
									onClick={() => props.u.banned ? props.ban(props.u) : props.unban(props.u)} 
									className="btn btn-danger btn-sm btn-block " 
									> 
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