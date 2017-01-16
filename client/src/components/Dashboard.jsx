import React from 'react';
import Auth from '../modules/Auth';
import { Link, IndexLink } from 'react-router';
import ReferralsContainer from '../containers/ReferralsContainer.jsx';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';

const Dashboard = ({secretData, errors, referral, onChange}) => {
	return (
	<Card className="userdash">
		<AppBar
			showMenuIconButton={false}
			title={ secretData.name }
		>
			<Link className="logout-button" to="/board" >TOP CHART</Link> 
			<Link className="logout-button" to="/logout" >LOGOUT</Link> 
		</ AppBar>

		{ secretData && (
			<div>
				<CardText style={{ fontSize: '20px'}} >
					<ReferralsContainer />
				</CardText> 
				
			</div> ) }
	</Card>)
}

export default Dashboard;