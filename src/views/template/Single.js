import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import $ from 'jquery';
import classnames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class Single extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		console.log('bjn');
		return(
				<div className="col-md-4">
				<div className="col-md-12" id="tour_block">
                    <div className="col-md-12 col-sm-12 col-xs-12 tour-block pd-both-5" >
                        <div className="img-wrap">
                            <img
                                src={this.props.default_image}
                                className="img-responsive" style={{width:'320px'}} />
                            <div className="content-wrap">
                                <div className="t-title">
                                    <p>{this.props.name}</p>

                                    <p>{this.props.itinerary.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="content-block">
                            <div className="row no-gutter">
                                <ul>
                                    <li><p>Panitop <span>3D </span></p></li>
                                    <li><p>KATRA <span>3D </span></p></li>
                                    <li><p>JAMMU <span>3D </span></p></li>
                                </ul>
                            </div>
                            <div className="row no-gutter t-details">
                                <p>{this.props.description}</p>
                            </div>
                            <div className="row no-gutter tags">
                                <label className="tag tag-orange tag-green">TAG 1</label>
                                <label className="tag tag-orange tag-green">TAG 2</label>
                                <label className="tag tag-orange tag-green">TAG 3</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}

}