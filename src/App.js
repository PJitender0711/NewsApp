
import './App.css';
import News from './components/News';
import NavBar from './components/navbar';
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <News pageSize={9}/>
      </div>
    )
  }
}

