import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import DemoPushComponent from './WelcomePush.js';
import ActualPush from './ActualPush.js';
import PushVisual from '../PushVisual'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery'; 
import 'react-datepicker/dist/react-datepicker.css';




class SendPush extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      startDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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
                  Send Push
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                  <DemoPushComponent />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    )
  }
}

export default SendPush;
