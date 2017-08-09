import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PantryList from '../PantryList/PantryList';
import TopBar from '../TopBar/TopBar';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <div className="App-body">
          <PantryList />
        </div>
      </div>
    );
  }
}

App.defaultProps = {};

App.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
