import React from 'react'

export default class Loading extends React.Component {
	state = {
		text: 'Loading'
	}

	componentDidMount () {
		
		const stopper = 'Loading...'

		this.ticker = setInterval( () => {
			this.state.text !== stopper
				? this.setState( prevState => ({text: prevState.text + '.'}))
				: this.setState( () => ({
					text: 'Loading'
				}))
		}, 200)
	}

	componentWillUnmount() {
		clearInterval(this.ticker)
	} 

	render () {
		return (
			<div className='container'>
				<p className='text-center'>
					{this.state.text}
				</p>
			</div>
		)
	}
}