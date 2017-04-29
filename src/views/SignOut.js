import React, { Component } from 'react';
import $ from 'jquery';


export default class SignOut extends Component{

	componentWillMount(){
		$.ajax({
			url: 'https://www.informvisitors.com/logoutApiNewUI.php',
	        xhrFields: {
	          	withCredentials: true
	        },
	        success: function(value){
	        	console.log('logged out');
	        }
		});	
	}

	render(){
		return(
			<div></div>
		);
	}
}