import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Select } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash';
import uuid from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';

import { savePantryItem } from '../../redux/pantryItems';
import { unitNameFromToken } from '../utilities/stringUtilities';

const options = [
  { key: 'tsp', text: unitNameFromToken('tsp'), value: 'tsp' },
  { key: 'tbsp', text: unitNameFromToken('tbsp'), value: 'tbsp' },
  { key: 'floz', text: unitNameFromToken('floz'), value: 'floz' },
  { key: 'lb', text: unitNameFromToken('lb'), value: 'lb' },
  { key: 'oz', text: unitNameFromToken('oz'), value: 'oz' },
  { key: 'mg', text: unitNameFromToken('mg'), value: 'mg' },
  { key: 'mm', text: unitNameFromToken('mm'), value: 'mm' },
  { key: 'cm', text: unitNameFromToken('cm'), value: 'cm' },
  { key: 'in', text: unitNameFromToken('in'), value: 'in' },
];

class EditPantryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPantryItem: {},
      newPantryItem: {},
    };
  }

  // Fires when a new modal is being opened. If there is an id given and it
  // matches an existing pantry item, the modal becomes an edit pantry item
  // modal. Else, the modal is a new pantry item modal.
  componentWillReceiveProps(nextProps) {
    const { pantryItemId, pantryItems, patchStatus } = nextProps;
    const { id } = this.state;
    if (patchStatus.success && patchStatus.success === id) {
      this.props.handleClose();
    }

    if (pantryItemId && pantryItemId in pantryItems) {
      this.setState({
        currentPantryItem: pantryItems[pantryItemId],
        newPantryItem: pantryItems[pantryItemId],
        id: pantryItemId,
      });
    } else {
      this.setState({
        ...this.state,
        currentPantryItem: {},
        newPantryItem: {},
      });
    }
  }

  onFieldChange(keyValuePair) {
    let newPantryItem;
    const key = Object.keys(keyValuePair)[0];
    const value = Object.values(keyValuePair)[0];

    if (value) {
      newPantryItem = {
        ...this.state.newPantryItem,
        ...keyValuePair,
      };
    } else {
      newPantryItem = {
        ...this.state.newPantryItem,
      };
      delete newPantryItem[key];
    }

    this.setState({
      ...this.state,
      newPantryItem,
    });
  }

  isSaveDisabled(isEdit) {
    const { currentPantryItem, newPantryItem } = this.state;

    // False if fields are filled, because save should not be disabled. Also
    // checks if isEdit in order to also verify current field is not empty.
    const requiredFields = !(newPantryItem.name && newPantryItem.expires &&
      newPantryItem.initial && newPantryItem.unit) ||
      (isEdit && !newPantryItem.current);

    return (
      requiredFields ||
      // Check if there is any difference between the current pantry item and
      // the new one (with all the edits made). This will always be true if the
      // modal is for creating a new pantry item, as the current will be an
      // empty object.
      _.isEqual(currentPantryItem, newPantryItem) ||
      // Check if a save request has already been made and we are waiting.
      Object.prototype.hasOwnProperty.call(this.props.patchStatus, 'loading')
    );
  }

  handleSubmit(isSaveDisabled, isEdit) {
    const { newPantryItem } = this.state;
    const { savePantryItemDispatch } = this.props;
    const pantryItem = {
      ...newPantryItem,
    };

    if (!newPantryItem.notes) {
      pantryItem.notes = '';
    }

    if (!isSaveDisabled) {
      if (!isEdit) {
        const newId = uuid.v4();
        pantryItem.id = newId;
        pantryItem.current = newPantryItem.initial;
        pantryItem.recipes = [];
        pantryItem.notifications = [];
        this.setState({
          ...this.state,
          id: newId,
        });
      }
    }
    savePantryItemDispatch('user_id_goes_here', pantryItem);
  }

  render() {
    const { isOpen, handleClose, patchStatus } = this.props;
    const { currentPantryItem, newPantryItem } = this.state;

    // True if this modal is for editing existing item, false if new.
    const isEdit = Object.keys(currentPantryItem).length > 0;

    const isSaveDisabled = this.isSaveDisabled(isEdit);

    return (
      <Modal open={isOpen}>
        <Modal.Header>
          {isEdit ? 'Edit Pantry Item' : 'Add Pantry Item'}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form
              loading={
                Object.prototype.hasOwnProperty.call(
                  patchStatus,
                  'loading',
                )
              }
            >
              <Form.Group widths="equal">
                <Form.Input
                  label="Name"
                  placeholder="Name"
                  defaultValue={newPantryItem.name}
                  onChange={event =>
                    this.onFieldChange({ name: event.target.value })
                  }
                  required
                />
                <Form.Input
                  label="Expires"
                  required
                  control={() => (
                    <DatePicker
                      className="max-width"
                      selected={moment(newPantryItem.expires)}
                      placeholderText="Choose the expiry date"
                      onChange={date =>
                        this.onFieldChange({ expires: date })
                      }
                    />
                  )}
                />
              </Form.Group>
              <Form.Group widths="equal">
                {
                  isEdit ?
                    <Form.Input
                      label="Current amount"
                      placeholder="Current amount"
                      type="number"
                      defaultValue={newPantryItem.current}
                      onChange={event =>
                        this.onFieldChange({
                          current: Number(event.target.value),
                        })
                      }
                      required
                    /> : null
                }
                <Form.Input
                  label={isEdit ? 'Initial amount' : 'Amount'}
                  placeholder={isEdit ? 'Initial amount' : 'Amount'}
                  type="number"
                  defaultValue={newPantryItem.initial}
                  onChange={event =>
                    this.onFieldChange({ initial: Number(event.target.value) })
                  }
                  required
                />
                <Form.Field
                  control={Select}
                  label="Units"
                  options={options}
                  placeholder="Units"
                  value={newPantryItem.unit}
                  search
                  required
                  onChange={(event, value) =>
                    this.onFieldChange({ unit: value.value })
                  }
                />
              </Form.Group>
              <Form.TextArea
                label="Notes"
                value={newPantryItem.notes}
                placeholder="Record any further details about this item..."
                onChange={event =>
                  this.onFieldChange({ notes: event.target.value })
                }
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            positive
            onClick={() => this.handleSubmit(isSaveDisabled, isEdit)}
            disabled={isSaveDisabled}
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
  patchStatus: {},
};

EditPantryModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  pantryItemId: PropTypes.string,
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
  patchStatus: PropTypes.objectOf(
    PropTypes.string,
  ),
  savePantryItemDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pantryItems: state.pantry.pantryItems,
  patchStatus: state.pantry.patchStatus,
});

const mapDispatchToProps = dispatch => ({
  savePantryItemDispatch: (id, pantryItem) => {
    dispatch(savePantryItem(id, pantryItem));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPantryModal);
