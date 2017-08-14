import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Button,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';

import './PantryListItem.scss';
import { unitNameFromToken } from '../utilities/stringUtilities';

class PantryListItem extends Component {
  render() {
    const { pantryItem, openEditModal } = this.props;
    const pantryDate = moment(pantryItem.expires);

    return (
      <Segment color={null} loading={false} className="PantryListItem">
        {
          false ?
            <Message
              warning
              header="You must register before you can do that!"
              content="Visit our registration page, then try again."
            /> : null
        }
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Header as="h1">{pantryItem.name}</Header>
            </Grid.Column>
            <Grid.Column width={10} className="PantryListItem-right">
              <Button.Group>
                <Button onClick={() => console.log('clicked recipes')}>
                  Recipes
                  {
                    pantryItem.recipes.length > 0 ?
                      `(${pantryItem.recipes.length})` : null
                  }
                </Button>
                <Button onClick={() => console.log('clicked notes')}>
                  Notes
                </Button>
                <Button onClick={() => openEditModal(pantryItem.id)}>
                  Edit Item
                </Button>
                <Button
                  icon
                  onClick={() => console.log('clicked notifications')}
                >
                  <Icon name="bell outline" />
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Header sub>Expires</Header>
              {String(pantryDate.format('dddd, MMMM Do'))}
            </Grid.Column>
            <Grid.Column width={8}>
              <Header sub>Remaining</Header>
              {pantryItem.current}
              <span>
                {`
                ${' / '}
                ${pantryItem.initial}
                ${' '}
                ${unitNameFromToken(pantryItem.unit)}
                `}
              </span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
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
