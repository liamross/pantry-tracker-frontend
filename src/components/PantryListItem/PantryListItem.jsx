import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './PantryListItem.scss';
import { unitNameFromToken } from '../utilities/stringUtilities';

class PantryListItem extends Component {
  render() {
    const { pantryItem, openEditModal } = this.props;
    const pantryDate = moment(pantryItem.expires);
    return (
      <div className="PantryListItem">
        <div className="pantry-item-top pantry-item-container">
          <div className="pantry-item-name">{pantryItem.name}</div>
          <div className="pantry-item-amount">
            {pantryItem.current}
            <span className="pantry-item-original-amount">
              {` / ${pantryItem.initial} ${unitNameFromToken(pantryItem.unit)}`}
            </span>
          </div>
        </div>
        <div className="pantry-item-bottom pantry-item-container">
          <div className="stack-container">
            <div className="expires-tag">Expiry date:</div>
            <div className="pantry-item-expires">
              {String(pantryDate.format('dddd, MMMM Do'))}
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
            onClick={() => openEditModal(pantryItem.id)}
          >
            Edit Item
          </button>
        </div>
      </div>
    );
  }
}

PantryListItem.propTypes = {
  pantryItem: PropTypes.objectOf(   // pantryItem
    PropTypes.oneOfType([
      PropTypes.string,             // id, name
      PropTypes.instanceOf(moment), // expires
      PropTypes.number,             // amount.current, amount.initial
      PropTypes.string,             // amount.unit
      PropTypes.arrayOf(            // recipes, notifications
        PropTypes.string,           // recipe.id, notification.id
      ),
    ]),
  ).isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default PantryListItem;
