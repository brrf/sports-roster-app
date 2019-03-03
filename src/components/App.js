import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      	<div>
	      	<li><Link to='./'>Home</Link></li>
	      	<li><Link to='./players'>Players</Link></li>
	      	<li><Link to='./teams'>Teams</Link></li>
      	</div>
      </Router>
    );
  }
}

export default App;
