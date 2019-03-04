import React from 'react'
import {Route} from 'react-router-dom'
import Sidebar from './Sidebar'
import {getTeamsArticles} from '../api'
import Article from './Article'
import Loading from './Loading'

export default class Articles extends React.Component {
	state = {
		loading: true,
		teamArticles: []
	}

	componentDidMount () {
		getTeamsArticles(this.props.match.params.teamId)
			.then( (articles) => this.setState({
				loading: false,
				teamArticles: articles.map( (article) => article.title)
			}))
	}

	render () {
		const {loading, teamArticles} = this.state
		const {params, url} = this.props.match
		const {teamId} = params

		return loading === true
			? <Loading />
			: <div className='container two-column'>
				<Sidebar title='Articles'
						 list={teamArticles}
						 loading={loading}
						 {...this.props} />
				<Route path={`${url}/:articleId`} render={ ({ match }) => (
					<Article articleId={match.params.articleId} teamId={teamId}>
						{(article) => !article ? <Loading /> : (
							<div className='panel'>
								<article className='article' key={article.id}>
									<h1 className='header'>{article.title}</h1>
									<p>{article.body}</p>
								</article>
							</div>
						)}
					</Article>
				)} />
			  </div>			
	}
}