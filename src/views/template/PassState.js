import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Single from './Single.js';
import classnames from 'classnames';
import $ from 'jquery';
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class PassState extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: null,
			a: 0
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		var parent = this;
		$.ajax({
			url: 'https://www.tratoli.com/api/new_package/',
			type: 'POST',
        	data: { location: 83, days: "20,21", tags: "Culture"},
        	contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        	success: function (response) {
	            console.log(response);
	            parent.setState({
	            	data: response
	            })
	        },
		})
	}
	handleChange(e) {
	  var options = e.target.options;
	  var value = [];
	  for (var i = 0, l = options.length; i < l; i++) {
	  	console.log(options[i].selected);
	    if (options[i].selected) {
	      value.push(options[i].value);
	    }
	  }
	  console.log(value);
	}

	render(){
		var parent = this;
		var hello;
		var options = [
		  { value: 'Kargil', label: 'Kargil' },
		  { value: 'Srinagar', label: 'Srinagar' }
		];
		var locations = [];
		function logChange(val) {
			locations.push(val.value);
		  console.log(val.value);
		  hello = parent.state.data && Object.keys(parent.state.data).map(function(val, i) {
    		for(var j=0; j<lengthFilter; j++){
    			for(var k = 0; k<parent.state.data[val]["itinerary"].length; k++){
    				if(locations[j] == parent.state.data[val]["itinerary"][k]["location"]){
    					console.log(parent.state.data[val]["itinerary"][k]["location"]);
    					console.log('dda',locations[j]);

    					return <Single name={parent.state.data[val]["name"]} description={parent.state.data[val]["description"]} default_image = {parent.state.data[val]["default_image"]} itinerary={parent.state.data[val]["itinerary"]}/>
    				}
    			}
    		}

    		console.log('a');
    		return <div>das</div>
            
        	})
		
		}

		hello = parent.state.data && Object.keys(parent.state.data).map(function(val, i) {
   

    					return <Single name={parent.state.data[val]["name"]} description={parent.state.data[val]["description"]} default_image = {parent.state.data[val]["default_image"]} itinerary={parent.state.data[val]["itinerary"]}/>
    	
            
        	})
		

		console.log(hello);

		var parent = this;
		var lengthFilter = options.length;
    	


		return(
		<div>
			<div className="row">
				<Select
				  name="form-field-name"
				  value="one"
				  options={options}
				  onChange={logChange}
				/>
			</div>
			<div className="row">
				<div className="row">
				 {hello}
				</div>
			</div>
		</div>
		);
	}
}