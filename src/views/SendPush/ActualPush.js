import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import DateTimeField from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import PushVisual from '../PushVisual'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery'; 



export default class ActualPush extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	    	imageActual: '',
	    	titleActual: '',
	    	descriptionActual: '',
	    	linkActual: '',
	    	button1TextActual:'',
	    	button2TextActual:'',
	    	button1ClickedFlagActual: false,
	    	button2ClickedFlagActual: false,
	    	link1DesktopActual: '',
	    	link2DesktopActual: '',
	    	link1MobileActual: '',
	    	link2MobileActual: '',
	    	stickyActual: 0,
	    	suspendTimeActual: '',
	    	tagsActual: '',
	    	targetedActual: '',
	    	date: "1990-06-05 08-42",
	        format: "YYYY-MM-DD HR-MM",
	        inputFormat: "DD/MM/YYYY HR/MM",
	    }

	   	this.handleChangeExpiry = this.handleChangeExpiry.bind(this);
	   	this.handleChangeSchedule = this.handleChangeSchedule.bind(this);
	   	this.actualPushButtonClicked = this.actualPushButtonClicked.bind(this);
	    this.handleChangeInputActual = this.handleChangeInputActual.bind(this);
	    this.button1ChangedActual = this.button1ChangedActual.bind(this);
	    this.button2ChangedActual = this.button2ChangedActual.bind(this);
	    this.onStickyChange0Actual = this.onStickyChange0Actual.bind(this);
	    this.onStickyChange1Actual = this.onStickyChange1Actual.bind(this);
    }

    onStickyChange0Actual(){

	    var parent = this;
	    this.setState({
	      stickyActual: 0
	    });
	  }

	  onStickyChange1Actual(){
	    var parent = this;
	    this.setState({
	      stickyActual: 1
	    });
	  }

    button1ChangedActual(event){
	    this.setState({
	      button1TextActual: event.target.value
	    });
	    if(event.target.value){
	      this.setState({
	        button1ClickedFlagActual : true
	      })
	    }
	    else{
	      this.setState({
	        button1ClickedFlagActual : false
	      })
	    }

	  };

	  button2ChangedActual(event){
	    this.setState({
	      button2TextActual: event.target.value
	    });
	    if(event.target.value){
	      this.setState({
	        button2ClickedFlagActual : true
	      })
	    }
	    else{
	      this.setState({
	        button2ClickedFlagActual : false
	      })
	    }

	  };

    handleChangeInputActual(input, e){
	    let text = e.target.value;
	    this.setState({
	      [input]: text
	    });
	 //    console.log(this.state.imageActual);
	 //    console.log(this.state.descriptionActual);
		// console.log(this.state.titleActual);
		// console.log(this.state.linkActual);
	  }

	actualPushButtonClicked(){
		console.log(this.state.imageActual);
		// console.log(this.state.descriptionActual);
		// console.log(this.state.titleActual);
		// console.log(this.state.linkActual);
	}

    handleChangeExpiry(newDate){
	    console.log("newDate", JSON.stringify(newDate));
	    return this.setState({date: newDate});
	  }

	handleChangeSchedule(newDate){
	    console.log("newDate", newDate);
	    return this.setState({date: newDate});
	  }

	render(){
		return(
			<div className="row">
				<div className="col-sm-12 col-lg-6">

	                  <div className="card">
	                    <div className="card-header">
	                      <strong>Send a Push Notification to your subscribers</strong>
	                    </div>
	                    <div className="card-block">
	                      <div className="form-group">
	                        <label htmlFor="image">Image(Optional)</label>
	                        <input onChange={e => this.handleChangeInputActual('imageActual', e)} type="text" className="form-control" id="imagePush" placeholder="Image 80*80"/>
	                      </div>

	                      <div className="form-group">
	                        <label htmlFor="title">Title</label>
	                        <input onChange={e => this.handleChangeInputActual('titleActual', e)} type="text" className="form-control" id="titlePush" placeholder="Enter the title" required="true" />
	                      </div>

	                      <div className="form-group">
	                        <label htmlFor="description">Description</label>
	                        <input onChange={e => this.handleChangeInputActual('descriptionActual', e)} type="text" className="form-control" id="descriptionPush" placeholder="Enter the description" required/>
	                      </div>

	                      
	                      <div className="form-group">
	                        <label htmlFor="sticky">Link</label>
	                        <input onChange={e => this.handleChangeInputActual('linkActual', e)} type="text" className="form-control" id="stickyPush" placeholder="Enter the link"/>
	                      </div>


	                      <div className="form-group">
				              <label htmlFor="button1DemoPush" >Button-1 (Text)</label>
				              <input type="text" className="form-control" onChange={this.button1ChangedActual} id="button1DemoPush" placeholder="Enter the text" required/>
				            </div>

				            { this.state.button1ClickedFlagActual && <div style={{margin: '0 0 0 auto', borderLeft:'1px solid #eee'}} className="animated fadeIn col-sm-11 ">
				              <div className="form-group">
				                <label htmlFor="link1DesktopDemoPush">Link1 (Desktop)</label>
				                <input type="text"  onChange={e => this.handleChange('link1DesktopActual', e)} className="form-control" id="link1DesktopDemoPush" placeholder="Enter the link" required/>
				              </div>

				              <div className="form-group">
				                <label htmlFor="link1MobileDemoPush">Link1 (Mobile)</label>
				                <input type="text"  onChange={e => this.handleChange('link1MobileActual', e)} className="form-control" id="link1MobileDemoPush" placeholder="Enter the link" required/>
				              </div></div>
				            }

				            <div className="form-group">
				              <label htmlFor="button1DemoPush" >Button-2 (Text)</label>
				              <input type="text" className="form-control" onChange={this.button2ChangedActual} id="button1DemoPush" placeholder="Enter the text" required/>
				            </div>

				            { this.state.button2ClickedFlagActual && <div style={{margin: '0 0 0 auto', borderLeft:'1px solid #eee'}} className="animated fadeIn col-sm-11 ">
				              <div className="form-group">
				                <label htmlFor="link1DesktopDemoPush">Link2 (Desktop)</label>
				                <input type="text"  onChange={e => this.handleChange('link2DesktopActual', e)} className="form-control" placeholder="Enter the link" required/>
				              </div>

				              <div className="form-group">
				                <label htmlFor="link1MobileDemoPush">Link2 (Mobile)</label>
				                <input type="text"  onChange={e => this.handleChange('link2MobileActual', e)} className="form-control"  placeholder="Enter the link" required/>
				              </div></div>
				            }

				           

	                      <div className="form-group">
				              <label htmlFor="suspendDemoPush">Suspend after Push Extra click (sec)</label>
				              <input type="text" onChange={e => this.handleChangeInputActual('suspendTimeActual', e)}  className="form-control" id="suspendDemoPush" placeholder="Suspend Time"/>
				            </div>


	                      <div className="form-group">
				              <label htmlFor="tagsDemoPush">Tags</label>
				              <input type="text" onChange={e => this.handleChangeInputActual('tagsActual', e)}  className="form-control" id="tagsDemoPush" placeholder="Tags"/>
				            </div>

	                      <div className="form-group">
	                        <label htmlFor="tags">Targeted User Tags (Optional, Comma Separated)</label>
	                        <input onChange={e => this.handleChangeInputActual('targetedActual', e)}  type="text" className="form-control" id="targetPush" placeholder="Push will be sent only to the tagged users"/>
	                      </div>

	                      <div id="expiryTime" className="form-group">
	                        <label htmlFor="tags">Expiry Time</label>
							<DateTimeField id="abc" dateFormat="YYYY-MM-DD" defaultValue="Please select a date"
                                     onChange={this.handleChangeExpiry}/>
                          </div>
                          <div id="scheduleTime" className="form-group">
	                        <label htmlFor="tags">Schedule Time</label>
							<DateTimeField dateFormat="YYYY-MM-DD" defaultValue="Please select a date"
                                     onChange={this.handleChangeSchedule}/>
                          </div>
            				<button type="button" className="btn btn-primary" onClick={this.actualPushButtonClicked}>Send Push</button>

	                    </div>
	                  </div>

	                </div>
	               	<div className="col-sm-6">

				        <div className="card-header">
				          See as you type
				        </div>
				        <div className="card-block">
				        </div>
				    </div>
                </div>

		);
	}
}