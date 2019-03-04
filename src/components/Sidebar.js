import React from 'react'
import Proptypes from 'prop-types'
import {Link, Route} from 'react-router-dom'
import slug from 'slug'

Sidebar.propTypes = {
	title: Proptypes.string.isRequired,
	list: Proptypes.array.isRequired,
	loading: Proptypes.bool.isRequired
}

function CustomLink ({to, children}) {
	return (
		<Route
			path={to.pathname}
			children={({ match }) => (
				<li style={{listStyleType: 'none', fontweight: match ? 'bold' : 'none'}}>
					<Link to={to}>{children}</Link>
				</li>
			)} />
	)
}

export default function Sidebar ({title, list, loading, location, match}) {
		if (loading === true) {
			return <div>Loading...</div>
		}

		return (
			<div>
				<h3 className='header'>{title}</h3>
				<ul className='sidebar-list'>
					{list.map( (item) => (
						<CustomLink
							key={item}
							to={{
								pathname: `${match.url}/${slug(item)}`,
								search: location.search
							}}>
							{item.toUpperCase()}
						</CustomLink>
					))}
				</ul>
			</div>
		)
}