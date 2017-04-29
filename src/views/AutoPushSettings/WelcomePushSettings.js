import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import $ from 'jquery';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class WelcomePushSettings extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: 'Thanks for subscribing',
			description: 'Stay updated on the most stunning offers and updates from our website.',
			imageURL: 'https://www.informvisitors.com/images/notif-push.png',
			modal: false,
			landingURL: 'https://www.informvisitors.com',
			responseMessage: ''
		};
		this.saveSettings = this.saveSettings.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.toggle = this.toggle.bind(this);
		this.changeEncode = this.changeEncode.bind(this);
	}

	componentDidMount(){
		var parent = this;
		$.ajax({
			url: 'https://www.informvisitors.com/welcomePushSettingsNewUI.php',
			xhrFields: {
		      withCredentials: true
		   	},
			success: function(data){
				data = JSON.parse(data);
				console.log('lets check the data');
				console.log(data);
				data.icon = data.icon.split('?url=');
				// console.log(JSON.parse(data["icon"]));
				console.log(data.icon[0]);
				// console.log(typeof(data));
				parent.setState({
					title: data.title,
					description: data.body,
					imageURL: data.icon[0],
					landingURL: data.icon[1]


				});
			}
		})
	}

	handleChange(input, e){
	    let text = e.target.value;
	    this.setState({
	      [input]: text
	    });
	}

	changeEncode(link){
		return(encodeURIComponent(link).replace(/'/g,"%27").replace(/"/g,"%22"));
	}


    toggle() {
	    this.setState({
	      modal: !this.state.modal
	    });
	}

	saveSettings(){
		var parent = this;
		if(!(this.state.title && this.state.description && this.state.imageURL && this.state.landingURL)){
			this.setState({
				modal: true,
				responseMessage: 'Please fill in the required fields'
			})
		}
		else{
			var urlSend = "https://www.informvisitors.com/changeWelcomePushNewUI.php?rand="+parseInt(Math.random()*999999999999999)+"&weTitle="+this.changeEncode(this.state.title)+"&weDesc="+this.changeEncode(this.state.description)+"&weImage="+this.changeEncode(this.state.imageURL)+"&weURL="+this.changeEncode(this.state.landingURL);
			
			$.ajax({
	            url: 'https://www.informvisitors.com/changeWelcomePushNewUI.php',
	            xhrFields: {
			      withCredentials: true
			   },
	            success: function(data){
	              parent.setState({
	                responseMessage : data,
	                xhrFields: {
					      withCredentials: true
					},
	                modal: true
	              });
	              console.log(data);
	              console.log(parent.state.responseMessage);

	            }
          	});
		}
	}

	render(){
		return(

			<div className="col-sm-12">

                  <div className="card">
                    <div className="card-header">
                      <strong>Please configure the welcome push to be shown to users on sign up.</strong>
                    </div>
                    <div className="card-block">
                      <div className="form-group">
                        <label htmlFor="titleAutoPush">Title<span className="required">*</span></label>
                        <input value={this.state.title} onChange={e => this.handleChange('title', e)} type="text" className="form-control" id="titleAutoPush" placeholder="Thanks for subscribing"/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="descriptionAutoPush">Description<span className="required">*</span></label>
                        <input value={this.state.description} onChange={e => this.handleChange('description', e)} type="text" className="form-control" id="descriptionAutoPush" placeholder="Stay updated on the most stunning offers and updates from our website."/>
                      </div>

                     
                      <div className="form-group">
                        <label htmlFor="imageAutoPush">Image URL<span className="required">*</span></label>
                        <input value={this.state.imageURL} onChange={e => this.handleChange('imageURL', e)} type="text" className="form-control" id="imageAutoPush" placeholder="https://www.informvisitors.com/images/notif-push.png"/>
                      </div>

                      <div className="form-group">
                        <label htmlFor="landingPageAutoPush">Landing Page<span className="required">*</span></label>
                        <input value={this.state.landingURL} onChange={e => this.handleChange('landingURL', e)} type="text" className="form-control" id="targetPush" placeholder="https://www.informvisitors.com"/>
                      </div>

            		<button type="button" className="btn btn-primary" onClick={this.saveSettings}>Save</button>
            		<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		              <ModalBody>
		                {this.state.responseMessage}
		              </ModalBody>
		              <ModalFooter>
		                <Button color="primary" onClick={this.toggle}>Okay</Button>
		              </ModalFooter>
		            </Modal>
                    </div>
                  </div>

                </div>

		);
	}
}