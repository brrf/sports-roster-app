import React from 'react'
import Sidebar from './Sidebar'
import {getTeamNames} from '../api'
import TeamLogo from './TeamLogo'
import Team from './Team'
import {Route, Link} from 'react-router-dom'
import Loading from './Loading'


export default class Teams extends React.Component {
	state = {
		teamNames: [],
		loading: true
	}

	componentDidMount = () => {
		getTeamNames()
		  .then( (teamNames) => this.setState({
		  	teamNames,
		  	loading: false
		  }))
	}

	render () {
		const {teamNames, loading} = this.state
		const {location, match} = this.props
		return (
			<div className='container two-column'>
				<Sidebar
				  	title='Teams'
				  	list={teamNames}
				  	loading={loading}
				  	{...this.props} 
				/>

				{loading === false && location.pathname === '/teams'
					? <div className='sidebar-instruction'>Select a Team</div>
					: null
				}

				<Route path={`${match.url}/:teamId`} render={ ({ match }) => {
					if (loading === true) return null;

					//const {established, manager, coach, id} = teamNames.find( (team) => team.name === match.params.teamId);

					return (
						<div className='panel'>
							<Team id={match.params.teamId}>
								{(team) => team === null
									? <Loading/>
									: <div style={{width: '100%'}}>
										<TeamLogo id={team.id} className='center' />
									 	<div className='medium-header'>{team.name}</div>
									 	<ul className='info-list row'>
									 		<li>Established<div>{team.established}</div></li>
									 		<li>Manager<div>{team.manager}</div></li>
									 		<li>Coach<div>{team.manager}</div></li>
									 	</ul>
									 	<Link className='center btn-main'
									 		  to={`/${match.params.teamId}`}
									 	>
									 		{team.name} Team Page
									 	</Link>
									  </div>
								}
							</Team>

						</div>
					)
				}} />
			</div>
		)
	}
}