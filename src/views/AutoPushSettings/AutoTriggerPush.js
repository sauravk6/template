import React, { Component } from 'react';
import WelcomePushSettings from './WelcomePushSettings.js';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import $ from 'jquery';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class AutoTriggerPush extends Component{
	constructor(props){
		super(props);
		this.state = {
			nameTrigger: '',
			startURL: '',
			jsPush: '',
			endURL: '',
			titlePush: '',
			descPush: '',
			imagePush: '',
			dynamicJsPath: '',
			landingPush: '',
			timePush: '',
			imageJSPush: '',
			modal: false,
			responseMessage: '',
			tablePush: null
		};

		this.saveButtonClicked = this.saveButtonClicked.bind(this);
		this.handleChangeInputTrigger = this.handleChangeInputTrigger.bind(this);
		this.toggle = this.toggle.bind(this);
		this.showTable = this.showTable.bind(this);
		this.changeEncode = this.changeEncode.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.editItem = this.editItem.bind(this);
	}

	changeEncode(link){
	    return(encodeURIComponent(link).replace(/'/g,"%27").replace(/"/g,"%22"));
	}

	editItem(id){
		var parent = this;
		$.ajax({
			url: 'https://www.informvisitors.com/editRuleApiNewUI.php?ruleId='+id,
			xhrFields: {
		        withCredentials: true
		    },
		    success: function(value){
		    	value = JSON.parse(value);
		    	console.log(value[0]);
		    	parent.setState({
		    		endURL: value[0]['end_url'],
		    		descPush: value[0]['desc2'],
		    		timePush: value[0]['timeInt'],
		    		landingPush: value[0]['landingURL'],
		    		nameTrigger: value[0]['ruleName'],
		    		imageJSPush: value[0]['dynamicImageJS']
		    	});
		    	if(value[0]['trigger_type'] == 0){
		    		parent.setState({
		    			startURL: value[0]['start_url']

		    		});
		    	}
		    	else{
		    		parent.setState({
		    			jsPush: value[0]['start_url']

		    		});
		    	}
		    	console.log( value[0]['end_url']);
		    	console.log(parent.state.descPush);
		    	console.log(parent.state.nameTrigger);
		    	console.log(parent.state.landingPush);
		    	console.log(parent.state.imageJSPush);
		    }
		})
	}

	deleteItem(id){
		var parent = this;
		// alert(id);
		$.ajax({
			url: 'https://www.informvisitors.com/deleteRuleApiNewUI.php?ruleId='+id+'&rand='+parseInt(Math.random()*999999999999999),
			xhrFields: {
		        withCredentials: true
		    },
		    success: function(value){
		    	parent.setState({
		    		responseMessage: 'Rule Deleted Successfully',
		    		modal: true
		    	});
		    	parent.showTable();
		    }

		})
	}

	toggle() {
	    this.setState({
	      modal: !this.state.modal
	    });
	  }

	handleChangeInputTrigger(input, e){
	    let text = e.target.value;
	    this.setState({
	      [input]: text
	    });
	 //    console.log(this.state.imageActual);
	 //    console.log(this.state.descriptionActual);
		// console.log(this.state.titleActual);
		// console.log(this.state.linkActual);
	}

	componentDidMount(){
		var parent = this;
		$.ajax({
			url: 'https://www.informvisitors.com/saveTriggerPushTableApiNewUI.php',
			xhrFields: {
		        withCredentials: true
		    },
		    success: function(value){
		    	value = JSON.parse(value);
		    	console.log(value);
		    	parent.setState({
		    		tablePush: value
		    	});
		    }
		});
		this.showTable();
	}

	showTable(){
		var parent = this;
		$.ajax({
			url: 'https://www.informvisitors.com/saveTriggerPushTableApiNewUI.php',
			xhrFields: {
		        withCredentials: true
		    },
		    success: function(value){
		    	value = JSON.parse(value);
		    	console.log(value);
		    	parent.setState({
		    		tablePush: value
		    	});
		    	console.log('huha');
		    	console.log(parent.state.tablePush);
		    }
		});
	}


	saveButtonClicked(){
		var parent = this;
		console.log(this.state.startURL);
		console.log(parent.state.descPush);
		    	console.log(parent.state.nameTrigger);
		    	console.log(parent.state.landingPush);
		    	console.log(parent.state.imageJSPush);
		if(this.state.startURL != '' && this.state.jsPush != ''){
				this.setState({
					responseMessage: 'You can only either start URL or start JS element',
					modal: true
				});
		}
		else{
			if((this.state.endURL == '') && (this.state.titlePush == '') && (this.state.descPush == '') && (this.state.imagePush == '') && (this.state.landingPush == '') && (this.state.timePush == '')){
				this.setState({
					responseMessage: 'Please fill in the required fields',
					modal: true
				});
			}
			else{
				$.ajax({
					url: 'https://www.informvisitors.com/saveTriggerPushApiNewUI.php?rand='+parseInt(Math.random()*999999999999999)+'&startURL='+parent.changeEncode(parent.state.startURL)+'&jsPush='+parent.changeEncode(parent.state.jsPush)+'&endURL='+parent.changeEncode(parent.state.endURL)+'&titlePush='+parent.changeEncode(parent.state.titlePush)+'&descPush='+parent.changeEncode(parent.state.descPush)+'&imagePush='+parent.changeEncode(parent.state.imagePush)+'&landingPush='+parent.changeEncode(parent.state.landingPush)+'&timePush='+parent.changeEncode(parent.state.timePush)+'&nameTrigger='+parent.changeEncode(parent.state.nameTrigger)+'&imageJSPush='+parent.changeEncode(parent.state.imageJSPush),
				        xhrFields: {
				          withCredentials: true
				    },
				    success: function(value){
				        parent.setState({
				            responseMessage: value,
				            modal: true
				        });
				    }
				});
				console.log('dfs');
			}
		}
		this.showTable();
	}

	render(){
		var parent = this;

		let hello = this.state.tablePush && this.state.tablePush.map(function(val, i) {
              // console.log(parent.state.tablePush[val]['isActive']);
              return <tr className="text-center" key={val['entry_id']} >
                        <td>{val['rule']}</td>
                        <td>
            				<button type="button" className="btn btn-primary" onClick={e => parent.editItem(val['entry_id'])}>Edit</button>
            				<button type="button" className="btn btn-danger second_button" onClick={e => parent.deleteItem(val['entry_id'])}>Delete</button>

                        </td>

                      </tr>
            })


		return(

			<div className="row">
                    <div className="col-lg-12">
                      <div className="card">
                        <div className="card-block">
                          <table className="table table-striped">
                            <thead>
                              <tr className="text-center">
                                <th className="text-center">Rule Name</th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {hello}
                              
                            </tbody>
                          </table>

                          	<div className="card">
	                            <div className="card-header">
	                              <strong>Set a new goal condition to trigger automatic push notifications to the users</strong>
	                            </div>
                    		<div className="col-lg-6">
                          
                            <div className="card-block">
	                              <div className="form-group">
	                                <label htmlFor="titleAutoPush">Name (Give a name to this rule):</label>
	                                <input value={this.state.nameTrigger} onChange={e => this.handleChangeInputTrigger('nameTrigger', e)} type="text" className="form-control" id="titleAutoPush" placeholder="Thanks for subscribing"/>
	                              </div>

	                              <div className="form-group">
	                                <label htmlFor="descriptionAutoPush">Start URL (For websites having dedicated page for cart):</label>
	                                <input value={this.state.startURL} onChange={e => this.handleChangeInputTrigger('startURL', e)} type="text" className="form-control" id="descriptionAutoPush" placeholder="Stay updated on the most stunning offers and updates from our website."/>
	                              </div>

	                             
	                              <div className="form-group">
	                                <label htmlFor="imageAutoPush">Start JS element (Only for websites opening cart in popup):</label>
	                                <input value={this.state.jsPush} onChange={e => this.handleChangeInputTrigger('jsPush', e)} type="text" className="form-control" id="imageAutoPush" placeholder="https://www.informvisitors.com/images/notif-push.png"/>
	                              </div>


	                              <div className="form-group">
	                                <label htmlFor="tags">End URL (Checkout URL starts with):<span className="required">*</span></label>
	                                <input value={this.state.endURL} onChange={e => this.handleChangeInputTrigger('endURL', e)} type="text" className="form-control" id="tagsPush" placeholder="Tags"/>
	                              </div>

	                              <div className="form-group">
	                                <label htmlFor="landingPageAutoPush">Title<span className="required">*</span></label>
	                                <input value={this.state.titlePush} onChange={e => this.handleChangeInputTrigger('titlePush', e)} type="text" className="form-control" id="targetPush" placeholder="https://www.informvisitors.com"/>
	                              </div>
	                              <div className="form-group">
	                                <label htmlFor="landingPageAutoPush">Description<span className="required">*</span></label>
	                                <input value={this.state.descPush} onChange={e => this.handleChangeInputTrigger('descPush', e)} type="text" className="form-control" id="targetPush" placeholder="https://www.informvisitors.com"/>
	                              </div>
	                              <div className="form-group">
	                                <label htmlFor="landingPageAutoPush">Image URL<span className="required">*</span></label>
	                                <input value={this.state.imagePush} onChange={e => this.handleChangeInputTrigger('imagePush', e)} type="text" className="form-control" id="targetPush" placeholder="https://www.informvisitors.com"/>
	                              </div>
	                              <div className="form-group">
	                                <label htmlFor="landingPageAutoPush">Dynamic Image JS Path (Example - .cart_item .item_img img):</label>
	                                <input value={this.state.imageJSPush} onChange={e => this.handleChangeInputTrigger('imageJSPush', e)} type="text" className="form-control" id="targetPush" placeholder="https://www.informvisitors.com"/>
	                              </div>
	                              <div className="form-group">
	                                <label htmlFor="landingPageAutoPush">Landing Page<span className="required">*</span></label>
	                                <input value={this.state.landingPush} onChange={e => this.handleChangeInputTrigger('landingPush', e)} type="text" className="form-control" id="targetPush" placeholder="https://www.informvisitors.com"/>
	                              </div>
	                              <div className="form-group">
	                                <label htmlFor="landingPageAutoPush">Time in minutes<span className="required">*</span></label>
	                                <input value={this.state.timePush} onChange={e => this.handleChangeInputTrigger('timePush', e)} type="text" className="form-control" id="targetPush" placeholder="https://www.informvisitors.com"/>
	                              </div>
            						<button type="button" className="btn btn-primary" onClick={this.saveButtonClicked}>Save</button>
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
                        </div>
                      </div>
                    </div>
                  </div>

		);
	}
}