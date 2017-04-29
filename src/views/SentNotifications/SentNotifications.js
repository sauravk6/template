import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import $ from 'jquery'; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class SentNotifications extends Component{
	constructor(props){
		super(props);
		this.state = {tableMap: null,
					  tableMapAuto: null
		};
	}

	componentDidMount(){
    	var parent = this;
	    $.ajax({
		   url: 'https://www.informvisitors.com/notificationsManualSentNewUI.php',
		   xhrFields: {
		      withCredentials: true
		   },
		   success: function(value){
		   	value = JSON.parse(value);
	        parent.setState({
	          tableMap: {a:{sad:'das'}}
	        });
	        parent.setState({
	          tableMap: value
	        });

	        // console.log('value');
	        // console.log(value);
	      }
	    })
	   $.ajax({
		   url: 'https://www.informvisitors.com/notificationsSentNewUI.php',
		   xhrFields: {
		      withCredentials: true
		   },
		    success: function(data){
		    	console.log((JSON.parse(data)));
		    	parent.setState({
		    		tableMapAuto : JSON.parse(data)
		    	});
		    }
		});
	  };

	render(){

		var parent = this;
    	let hello = this.state.tableMap && Object.keys(this.state.tableMap).map(function(val, i) {
            return <tr key={i} className="text-center">
                    <td>{parent.state.tableMap[val]["insertTime"]}</td>
                    <td>
                    	<div className="push-layout clearfix hidden-md-down">
							<div className="push-layout-left">
								<img src={parent.state.tableMap[val]["image"]} className="push-logo" />
							</div>
							<div className="push-layout-right">
								<h1 className="push-title">{parent.state.tableMap[val]["title"]}</h1>
								<p className="push-text">{parent.state.tableMap[val]["description"]}</p>
								<p className="push-text push-url">{parent.state.tableMap[val]["link"]}</p>
							</div>
						</div>
                    </td>
                    <td>{parent.state.tableMap[val]["sentTo"]}</td>
                    <td>{parent.state.tableMap[val]["delivered"]}</td>
                    <td>{parent.state.tableMap[val]["clicked"]}</td>
                    <td>{parent.state.tableMap[val]["CTR"]}</td>
                    <td>{parent.state.tableMap[val]["expiryTime"]}</td>
                  </tr>
        })

        let helloAuto = this.state.tableMapAuto && this.state.tableMapAuto.map(function(val, i) {
            console.log('lets check auto');
            console.log(val);
            return <tr key={i} className="text-center">
                    <td>{val["ruleName"]}</td>
                    <td>
                    	<div className="push-layout clearfix hidden-md-down">
							<div className="push-layout-left">
								<img src={val["image"]} className="push-logo" />
							</div>
							<div className="push-layout-right">
								<h1 className="push-title">{val["title"]}</h1>
								<p className="push-text">{val["desc"]}</p>
								<p className="push-text push-url">{val["link"]}</p>
							</div>
						</div>
                    </td>
                    <td>{val["sentTo"]}</td>
                    <td>{val["delivered"]}</td>
                    <td>{val["clicked"]}</td>
                    <td>{val["CTR"]}</td>
                    <td>{val["ordered"]}</td>
                  </tr>
            
        })

		return(

			<div className="animated fadeIn">
		        <div className="row">
		          <div className="col-lg-12">
		          	<div className="card">
		              <div className="card-header">
		                Auto Push
		              </div>
		              <table className="table table-striped">
		                  <thead>
		                    <tr className="text-center">
		                      <th className="text-center">Title</th>
		                      <th className="text-center">Notification</th>
		                      <th className="text-center">Sent To</th>
		                      <th className="text-center">Delivered</th>
		                      <th className="text-center">Clicked</th>
		                      <th className="text-center">CTR</th>
		                      <th className="text-center">Ordered</th>
		                    </tr>
		                  </thead>
		                  <tbody>
		                   	{helloAuto}
		                    
		                  </tbody>
		              </table>
		              
		            </div>
		            <div className="card">
		              <div className="card-header">
		                Manual Push
		              </div>
		              <table className="table table-striped">
		                  <thead>
		                    <tr className="text-center">
		                      <th className="text-center">Created On</th>
		                      <th className="text-center">Notification</th>
		                      <th className="text-center">Sent To</th>
		                      <th className="text-center">Delivered</th>
		                      <th className="text-center">Clicked</th>
		                      <th className="text-center">CTR</th>
		                      <th className="text-center">Expires On</th>
		                    </tr>
		                  </thead>
		                  <tbody>
		                   	{hello}
		                    
		                  </tbody>
		              </table>
		              
		            </div>
		            
		          </div>
		        </div>
		    </div>

		);
	}
}