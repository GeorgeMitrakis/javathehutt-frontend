import React from 'react';
import UserViewElem from './UserViewElem'

const userViewResults = (props)=>{
	if(props.users.length > 0){
		return props.users.map( (u, props) => {
			return (
				<UserViewElem 
					key={u.id}
					u={u}
					promote={props.promote}
					ban={props.ban}
					unban={props.unban}
				/>
			)
		});
	}
	else{
		return(
			<h3 className="d-flex justify-content-center">Δεν βρέθηκαν χρήστες με αυτό το e-mail</h3>
		);		
	}
	
}

export default userViewResults;