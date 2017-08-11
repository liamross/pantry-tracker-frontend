import React from 'react';
import { Menu } from 'semantic-ui-react';

import Panel from '../common/Panel/Panel';
import './TopBar.scss';

const NAV_PANEL = 'NavPanel';

class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openPanelId: null,
    };

    this.bindAll();
  }

  openPanel(id) {
    this.setState({
      ...this.state,
      openPanelId: id,
    });
  }

  closePanel(id) {
    if (id === this.state.openPanelId) {
      this.setState({
        ...this.state,
        openPanelId: null,
      });
    }
  }
//onClick={() => this.openPanel(NAV_PANEL)}
  bindAll() {
    this.closePanel = this.closePanel.bind(this);
  }

  render() {
    const { openPanelId } = this.state;
    return (
      <div className="TopBar">
        <Menu secondary>
          <Menu.Item
            icon="bars"
            onClick={() => this.openPanel(NAV_PANEL)}
            className="TopBar-NavPanelButton"
          />

          <Menu.Menu position="right">
            <Menu.Item
              icon="bell"
              onClick={() => console.log('Clicked Notifications')}
              className="TopBar-NotificationsButton"
            />
            <Menu.Item
              icon="user"
              onClick={() => console.log('Clicked Profile')}
              className="TopBar-ProfileButton"
            />
          </Menu.Menu>
        </Menu>

        <Panel
          isOpen={openPanelId === NAV_PANEL}
          panelId={NAV_PANEL}
          closePanelFunction={this.closePanel}
        >
          <div>hi</div>
        </Panel>
      </div>
    );
  }
}

export default TopBar;
