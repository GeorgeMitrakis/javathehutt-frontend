import React from 'react';
import UserViewElem from './UserViewElem'

const userViewResults = (props)=>{
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

export default userViewResults;