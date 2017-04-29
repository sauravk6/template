import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import $ from 'jquery'; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class AccountSettings extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changePasswordClicked = this.changePasswordClicked.bind(this);
    this.addEmailClicked = this.addEmailClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      activeTab: '1',
      oldPassword: '',
      responseMessage: '',
      addEmail: '',
      modal: false,
      newPassword: '',
      confirmPassword: ''
    };
  }

  toggleModal(){
    this.setState({
      modal: !this.state.modal
    });
  }

  addEmailClicked(){
    var parent = this;
    $.ajax({
              url: 'https://www.informvisitors.com/changeEmail.php?rand='+parseInt(Math.random()*999999999999999)+'&email='+this.state.addEmail,
              success: function(data){
                parent.setState({
                  responseMessage : data,
                  modal: true
                });
                console.log(data);
                console.log(parent.state.responseMessage);

              }
          });
  }

  changePasswordClicked(){
      var parent = this;
      if(this.state.newPassword == this.state.confirmPassword){
        $.ajax({
              url: 'https://www.informvisitors.com/changePass.php?rand='+parseInt(Math.random()*999999999999999)+'&oldPass='+this.state.oldPassword+'&newPass='+this.state.newPassword,
              success: function(data){
                parent.setState({
                  responseMessage : data,
                  modal: true
                });
                console.log(data);
                console.log(parent.state.responseMessage);

              }
            });
      }
      else{
          this.setState({
                  responseMessage : 'New Password and Confirm Password should be same',
                  modal: true
          });
      }
  }

  handleChange(input, e){
    let text = e.target.value;
    this.setState({
      [input]: text
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
                  Password
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Add Email
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Google Analytics
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="col-sm-12">

                  <div className="card">
                    <div className="card-header">
                      <strong>Your password should be at least six characters long. To make it stronger, use upper and lower case letters, numbers and symbols like ! " ? $ % ^ & )</strong>
                    </div>
                    <div className="card-block">
                      <div className="form-group">
                        <label htmlFor="image">Old Password</label>
                        <input onChange={e => this.handleChange('oldPassword', e)} type="password" className="form-control" id="oldPassword" placeholder="Enter your old password" required/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="title">New Password</label>
                        <input onChange={e => this.handleChange('newPassword', e)} type="password" className="form-control" id="newPassword" placeholder="Enter the new password" required="true" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="title">Confirm Password</label>
                        <input onChange={e => this.handleChange('confirmPassword', e)} type="password" className="form-control" id="confirmPassword" placeholder="Enter the new password again" required="true" />
                      </div>

                    </div>
                    <button onClick={this.changePasswordClicked} type="button" className="btn btn-primary" >Change Password</button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                      <ModalBody>
                        {this.state.responseMessage}
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Okay</Button>
                      </ModalFooter>
                    </Modal>
                  </div>

                </div>
              </TabPane>
               <TabPane tabId="2">
                <div className="col-sm-12">

                  <div className="card">
                    <div className="card-header">
                      <strong>Keep your account safe by adding a email address. If you ever have problems accessing your account, Inform Visitors will use what you enter here to verify your identity.</strong>
                    </div>
                    <div className="card-block">
                      <div className="form-group">
                        <label htmlFor="image">Add Email</label>
                        <input onChange={e => this.handleChange('addEmail', e)} type="text" className="form-control" id="addEmail" placeholder="Enter your email"/>
                      </div>


                    </div>
                      <button onClick={this.addEmailClicked} type="button" className="btn btn-primary" >Add Email</button>


                  </div>

                </div>
              </TabPane>
              <TabPane tabId="3">
                <div className="col-sm-12">

                  <div className="card">
                    <div className="card-header">
                      <strong>You can start getting in data in your google analytics as well regarding the push notifications sent, how many users it is going in real time, how many are clicking, how many are closing etc. You just need to add the UA id in form below. Find your UA id ( tracking ID ) by following below steps :
                      <ol>
                        <li>Sign in to your Analytics account.</li>
                        <li>Select the Admin tab.</li>
                        <li>Select an account from the dropdown in the ACCOUNT column.</li>
                        <li>Select a property from the dropdown in the PROPERTY column.</li>
                        <li>Under PROPERTY, click Tracking Info > Tracking Code.</li>
                      </ol>
                      </strong>
                    </div>
                    <div className="card-block">
                      <div className="form-group">
                        <img className="imgAnalytics" src="https://s3-ap-southeast-1.amazonaws.com/push-images/tracking-id.png" />
                      </div>

                      <div className="form-group">
                        <label htmlFor="description">Analytics Web Property ID :</label>
                        <input type="text" className="form-control col-md-3" id="analyticsId" placeholder="UA-2144XXXX-XX"/>
                      </div>
                    </div>
                  </div>

                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
      
    )
  }
}

export default AccountSettings;
