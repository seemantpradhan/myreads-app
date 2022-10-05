import React from 'react'
import {Route} from 'react-router-dom';
import MyReads from './components/MyReads';
import Search from './components/Search';
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={MyReads} />
        <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp
