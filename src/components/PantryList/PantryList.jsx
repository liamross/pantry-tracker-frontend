import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dimmer, Loader } from 'semantic-ui-react';
import { fetchPantryItems } from '../../redux/pantryItems';
import PantryListItem from '../PantryListItem/PantryListItem';
import EditPantryModal from '../EditPantryModal/EditPantryModal';

const pantryListStyle = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '100%',
};

class PantryList extends Component {
  constructor() {
    super();

    this.state = {
      isEditModalOpen: false,
      pantryItemId: null,
    };

    // Bind all functions.
    this.openEditModal = this.openEditModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.props.fetchPantryItems('user_id_goes_here');
  }

  isLoading() {
    return (this.props.error === null && this.props.pantryItems === null);
  }

  openEditModal(id = null) {
    this.setState({
      ...this.state,
      isEditModalOpen: true,
      pantryItemId: id,
    });
  }

  handleClose() {
    this.setState({
      ...this.state,
      isEditModalOpen: false,
      pantryItemId: null,
    });
  }

  renderContents() {
    const { pantryItems, error } = this.props;

    if (pantryItems && error === null) {
      return (
        Object.keys(pantryItems).map(key => (
          <PantryListItem
            pantryItem={pantryItems[key]}
            key={key}
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
    const { isEditModalOpen, pantryItemId } = this.state;
    return (
      <div style={pantryListStyle}>
        <Dimmer active={this.isLoading()} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Button onClick={() => this.openEditModal()}>New Pantry Item</Button>
        {this.renderContents()}
        <EditPantryModal
          isOpen={isEditModalOpen}
          handleClose={this.handleClose}
          pantryItemId={pantryItemId}
        />
      </div>
    );
  }
}

PantryList.defaultProps = {
  pantryItems: null,
  error: null,
};

PantryList.propTypes = {
  pantryItems: PropTypes.objectOf(  // pantryItems
    PropTypes.objectOf(             // pantryItem
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
    ),
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
