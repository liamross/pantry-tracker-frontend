import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PantryListItem.scss';

class PantryListItem extends Component {
  render() {
    const { pantryItem } = this.props;
    return (
      <div className="PantryListItem">
        <div className="pantry-item-top pantry-item-container">
          <div className="pantry-item-name">{pantryItem.name}</div>
          <div className="pantry-item-amount">
            {pantryItem.amount.current}
            <span className="pantry-item-original-amount">
              {` / ${pantryItem.amount.initial} ${pantryItem.amount.unit}`}
            </span>
          </div>
        </div>
        <div className="pantry-item-bottom pantry-item-container">
          <div className="stack-container">
            <div className="expires-tag">Expiry date:</div>
            <div className="pantry-item-expires">
              {String(pantryItem.expires.getDate())}/
              {String(pantryItem.expires.getMonth() + 1)}/
              {String(pantryItem.expires.getYear() + 1900)}
            </div>
          </div>
          <div className="stack-container">
            <div className="expires-tag">Upcoming recipes:</div>
            <div className="pantry-item-expires">
              {pantryItem.recipes.length}
            </div>
          </div>
          <button
            className="item-finished-button"
            onClick={() => (console.log('clicked'))}
          >
            Edit Item
          </button>
        </div>
      </div>
    );
  }
}

PantryListItem.propTypes = {
  pantryItem: PropTypes.objectOf( // pantryItem
    PropTypes.oneOfType([
      PropTypes.string,           // id, name
      PropTypes.instanceOf(Date), // expires
      PropTypes.objectOf(         // amount
        PropTypes.oneOfType([
          PropTypes.number,       // amount.current, amount.initial
          PropTypes.string,       // amount.unit
        ]),
      ),
      PropTypes.arrayOf(          // recipes, notifications
        PropTypes.string,         // recipe.id, notification.id
      ),
    ]),
  ).isRequired,
};

export default PantryListItem;
