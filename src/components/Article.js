import {Component} from 'react'
import {getArticle} from '../api'
import PropTypes from 'prop-types'

export default class Article extends Component {
	state = {
		article: null
	}

	static propTypes = {
		teamId: PropTypes.string.isRequired,
		articleId: PropTypes.string.isRequired,
		children: PropTypes.func.isRequired
	}

	componentDidMount () {
		const {teamId, articleId} = this.props
		this.getArticle(teamId, articleId)
	}

	getArticle = (articleId, teamId) => {
		this.setState({
			article: null
		})

		getArticle (articleId, teamId)
			.then( (article) => this.setState( () => ({
				article
			})))
	}	

	componentWillReceiveProps(nextProps) {
		if (this.props.articleId !== nextProps.articleId) {
			this.getArticle(nextProps.teamId, nextProps.articleId)
		}
	}

	render () {
		return this.props.children(this.state.article)
	}
}