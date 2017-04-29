import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, Progress } from 'reactstrap';

export default class PushVisual extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="push-layout clearfix hidden-md-down">
				<div className="push-layout-left">
					<img src={this.props.image} className="push-logo" />
				</div>
				<div className="push-layout-right">
					<h1 className="push-title">{this.props.title == '' ? <h1 className="push-title">Your title goes here</h1> : this.props.title}</h1>
					<p className="push-text">{this.props.description == '' ? <p className="push-text">Your description goes here</p> : this.props.description}</p>
					<p className="push-text push-url">{this.props.link == '' ? <p className="push-text">https://www.yourlinkgoeshere.com</p> : this.props.link}</p>
				</div>
				{this.props.button1 != '' ? <div style={{marginTop: '8px', borderTop: '1px solid #eee'}}>
					<p  style={{margin: '6px'}}>{this.props.button1}</p>
				</div> : this.props.button1}
				{this.props.button2 != '' ? <div style={{marginTop: '8px', borderTop: '1px solid #eee'}}>
					<p  style={{margin: '6px'}}>{this.props.button2}</p>
				</div> : this.props.button2}
			</div>

		);
	}
}

