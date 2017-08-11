import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Header, Modal } from 'semantic-ui-react';

class EditPantryModal extends Component {
  requestQueued() {
    const { pantryItemId, requestQueue } = this.props;
    return requestQueue.includes(pantryItemId);
  }

  render() {
    const {
      isOpen,
      handleClose,
      pantryItemId,
      pantryItems,
      requestQueue,
    } = this.props;
    return (
      <Modal open={isOpen}>
        <Modal.Header>Add Pantry Item</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Modal Header</Header>
            <p>
              This is the modal for editing or creating a pantry item.
            </p>
            <p>Pantry item:{' '}
              {pantryItemId || 'no pantry items found'}
            </p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            loading={this.requestQueued()}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            positive
            loading={this.requestQueued()}
            onClick={handleClose}
            icon="save"
            labelPosition="right"
            content="Save"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

EditPantryModal.defaultProps = {
  isOpen: false,
  pantryItemId: null,
  pantryItems: null,
};

EditPantryModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  pantryItemId: PropTypes.string,
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
  requestQueue: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  pantryItems: state.pantry.pantryItems,
  requestQueue: state.pantry.requestQueue,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditPantryModal);
