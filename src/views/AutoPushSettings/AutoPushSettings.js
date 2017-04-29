import React, { Component } from 'react';
import WelcomePushSettings from './WelcomePushSettings.js';
import AutoTriggerPush from './AutoTriggerPush.js';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class AutoPushSettings extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12 mb-2">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Welcome Push Settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Auto Push Trigger Settings
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                  <WelcomePushSettings />
              </TabPane>
              <TabPane tabId="2">
                  <AutoTriggerPush />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    )
  }
}

export default AutoPushSettings;
