import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Header from './Header'
import Homepage from '../container/Homepage'
import NavBar from './NavBar'
import EventsList from './EventsList'

import * as api from '../api'

console.log(api.createTracklistArray(['Oasis','Blur']))

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <div className="app-container">
          <Header />
          <div className="login">
            <img className='spotifylogo' src='https://image.flaticon.com/icons/png/512/7/7709.png'/><a href="/auth">Log in</a></div>
          <Route exact path='/search' component={Homepage} />
          <Route exact path='/events/:id' component={EventsList} />
        </div>
      </Router>
    )
  }
}
