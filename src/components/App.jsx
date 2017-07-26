import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PantryList from './PantryList/PantryList';

const headerStyle = {
  height: '40px',
  backgroundColor: 'lightblue',
};

const mainStyle = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  top: '40px',
  overflow: 'hidden',
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={headerStyle}>
          header
        </div>
        <div style={mainStyle}>
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
