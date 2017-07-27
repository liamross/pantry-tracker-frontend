import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { fetchPantryItems } from '../../redux/pantryItems';
import PantryListItem from '../PantryListItem/PantryListItem';

const pantryListStyle = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '100%',
};

class PantryList extends Component {
  componentWillMount() {
    this.props.fetchPantryItems('1234abcd');
  }

  isLoading() {
    return (this.props.error === null && this.props.pantryItems === null);
  }

  renderContents() {
    const { pantryItems, error } = this.props;

    if (pantryItems && error === null) {
      return (
        pantryItems.map(pantryItem => (
          <PantryListItem
            pantryItem={pantryItem}
            key={pantryItem.id}
          />
        ))
      );
    } else if (error !== null) {
      return (
        <div>Error: {error}</div>
      );
    }
    return null;
  }

  render() {
    return (
      <div style={pantryListStyle}>
        <Dimmer active={this.isLoading()} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        {this.renderContents()}
      </div>
    );
  }
}

PantryList.defaultProps = {
  pantryItems: null,
  error: null,
};

PantryList.propTypes = {
  pantryItems: PropTypes.arrayOf(
    PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(PantryList);
