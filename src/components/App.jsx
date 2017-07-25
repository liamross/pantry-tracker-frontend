import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPantryItems } from '../redux/pantryItems';

class App extends Component {
  componentWillMount() {
    this.props.fetchPantryItems('1234abcd');
  }

  renderContents() {
    const { pantryItems, error } = this.props;

    if (pantryItems !== null && pantryItems.length > 0) {
      return pantryItems.map(pantryItem => (
        <div className="pantry-item" key={pantryItem.id}>
          <div className="pantry-item-top pantry-item-container">
            <div className="pantry-item-name">{name}</div>
            <div className="pantry-item-amount">
              {pantryItem.amount.current}
              <span className="pantry-item-original-amount">
                      `/ ${pantryItem.amount.initial} ${pantryItem.amount.unit}`
                    </span>
            </div>
          </div>
          <div className="pantry-item-bottom pantry-item-container">
            <div className="stack-container">
              <div className="expires-tag">Expiry date:</div>
              <div className="pantry-item-expires">
                `${pantryItem.expires.getDate()}` + `/` +
                `${pantryItem.expires.getMonth() + 1}` + `/` +
                `${pantryItem.expires.getYear() + 1900}`
              </div>
            </div>
            <div className="stack-container">
              <div className="expires-tag">Upcoming recipes:</div>
              <div className="pantry-item-expires">
                {pantryItem.recipes.length}
              </div>
            </div>
            <button className="item-finished-button">Edit Item</button>
          </div>
        </div>
      ));
    } else if (error === null) {
      return 'Loading...';
    }
    return `Error: ${error}`;
  }

  render() {
    return (
      <div className="App">
        {this.renderContents()}
      </div>
    );
  }
}

App.defaultProps = {
  pantryItems: null,
  error: null,
};

App.propTypes = {
  pantryItems: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
  ),
  error: PropTypes.string,
  fetchPantryItems: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pantryItems: state.pantry.pantryItems,
  error: state.pantry.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPantryItems: id => dispatch(fetchPantryItems(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
