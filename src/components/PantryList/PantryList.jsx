import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import moment from 'moment';
import { fetchPantryItems } from '../../redux/pantryItems';
import PantryListItem from '../PantryListItem/PantryListItem';
import EditPantryModal from '../EditPantryModal/EditPantryModal';
import './PantryList.scss';

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
    this.props.fetchPantryItemsDispatch('user_id_goes_here');
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
            openEditModal={this.openEditModal}
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
    const { fetchStatus, fetchPantryItemsDispatch } = this.props;
    return (
      <div className="PantryList">
        <Dimmer
          active={
            Object.prototype.hasOwnProperty.call(
              fetchStatus,
              'loading',
            )
          }
          inverted
        >
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <div className="PantryList-bar">
          <Button onClick={() => this.openEditModal()}>New Pantry Item</Button>
        </div>
        {
          Object.prototype.hasOwnProperty.call(
            fetchStatus,
            'error',
          ) ?
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{fetchStatus.error}</p>
              <Button
                onClick={() => fetchPantryItemsDispatch('user_id_goes_here')}
              >
                Retry
              </Button>
            </Message> : null
        }
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
  pantryItems: PropTypes.objectOf(    // pantryItems
    PropTypes.objectOf(               // pantryItem
      PropTypes.oneOfType([
        PropTypes.string,             // id, name
        PropTypes.instanceOf(moment), // expires
        PropTypes.number,             // amount.current, amount.initial
        PropTypes.string,             // amount.unit
        PropTypes.arrayOf(            // recipes, notifications
          PropTypes.string,           // recipe.id, notification.id
        ),
      ]),
    ),
  ),
  fetchStatus: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
  error: PropTypes.string,
  fetchPantryItemsDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pantryItems: state.pantry.pantryItems,
  fetchStatus: state.pantry.fetchStatus,
  error: state.pantry.error,
});

const mapDispatchToProps = dispatch => ({
  fetchPantryItemsDispatch: id => dispatch(fetchPantryItems(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PantryList);
