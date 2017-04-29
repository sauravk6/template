import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import PushVisual from '../PushVisual'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery'; 
import DateTimeField from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default class DemoPushComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      button1ClickedFlag : false,
      button2ClickedFlag: false,
      modal: false,
      deviceID: '',
      image: '',
      modal: false,
      title: '',
      link: '',
      description: '',
      button1Text: '',
      button2Text: '',
      link1Desktop: '',
      link1Mobile: '',
      targetedTags: '',
      link2Desktop: '',
      link2Mobile: '',
      sticky: 0,
      modalDemoPush: false,
      select: '0',
      responseMessage: null,
      suspendTime: '',
      tags: '',
      auth: '',
      cl_id: '',
      sendTo: '',
      expiryDate: '',
      expiryDateTime: '',
      scheduleDate: '',
      scheduleDateTime: ''
    };
    this.button1Changed = this.button1Changed.bind(this)
    this.toggle = this.toggle.bind(this);
    this.toggleDemoPush = this.toggleDemoPush.bind(this);
    this.button2Changed = this.button2Changed.bind(this)
    this.actualPushButtonClicked = this.actualPushButtonClicked.bind(this)
    this.onStickyChange0 = this.onStickyChange0.bind(this)
    this.onStickyChange1 = this.onStickyChange1.bind(this)
    this.handleChangeExpiry = this.handleChangeExpiry.bind(this)
    this.handleChangeSchedule = this.handleChangeSchedule.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.sendDemoPush = this.sendDemoPush.bind(this)
    this.changeEncode = this.changeEncode.bind(this)
  };

  onStickyChange0(){
    var parent = this;
    this.setState({
      sticky: 0
    });
  }

  changeEncode(link){
    return(encodeURIComponent(link).replace(/'/g,"%27").replace(/"/g,"%22"));
  }

  actualPushButtonClicked(){
    var parent = this;
    var url;
    url = 'https://www.informvisitors.com/uploadPush2ApiNewUI.php?image='+parent.changeEncode(parent.state.image)+'~*~*&title='+parent.changeEncode(parent.state.title)+'&desc='+parent.changeEncode(parent.state.description)+'&link='+parent.changeEncode(parent.state.link)+'&button1='+parent.changeEncode(parent.state.button1Text)+'&button2='+parent.changeEncode(parent.state.button2Text)+'&link1Desk='+parent.changeEncode(parent.state.link1Desktop)+'&link1Mob='+parent.changeEncode(parent.state.link1Mobile)+'&link2Desk='+parent.changeEncode(parent.state.link2Desktop)+'&link2Mob='+parent.changeEncode(parent.state.link2Mobile)+'&isSticky='+parent.changeEncode(parent.state.sticky)+'&suspendTime='+parent.changeEncode(parent.state.suspendTime)+'&tags=&type=1&email=&cl_id='+parent.changeEncode(parent.state.cl_id)+'&auth='+parent.changeEncode(parent.state.auth)+'&expiry='+this.state.expiryDate+'%20'+this.state.expiryDateTime+':00&schTime='+this.state.scheduleDate+'%20'+this.state.scheduleDateTime+':00&imFact=0';

    $.ajax({
        url: url,
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
  }

  sendDemoPush(){
    if(this.state.link.includes("http://") || this.state.link.includes("https://")){
      var parent = this;
      var url;
      $.ajax({
        url: 'https://www.informvisitors.com/deviceIDApiNewUI.php',
        xhrFields: {
            withCredentials: true
        },
        success: function(value){
          value = JSON.parse(value);
          if(value == 'Please allow to send push to this device'){
            parent.setState({
              responseMessage: value,
              modal: true
            });
          }
          else{
            parent.setState({

              deviceID: value[0]['dev_id'],
              auth: value[0]['auth'],
              cl_id: value[0]['cl_id']
            });
          }
          console.log(value[0]);
          console.log(parent.state.auth);
          console.log(parent.state.deviceID);
          url = 'https://www.informvisitors.com/uploadPush2ApiNewUI.php?image='+parent.changeEncode(parent.state.image)+'&title='+parent.changeEncode(parent.state.title)+'&desc='+parent.changeEncode(parent.state.description)+'&link='+parent.changeEncode(parent.state.link)+'&button1='+parent.changeEncode(parent.state.button1Text)+'&button2='+parent.changeEncode(parent.state.button2Text)+'&link1Desk='+parent.changeEncode(parent.state.link1Desktop)+'&link1Mob='+parent.changeEncode(parent.state.link1Mobile)+'&link2Desk='+parent.changeEncode(parent.state.link2Desktop)+'&link2Mob='+parent.changeEncode(parent.state.link2Mobile)+'&isSticky='+parent.changeEncode(parent.state.sticky)+'&suspendTime='+parent.changeEncode(parent.state.suspendTime)+'&tags=&type=0&email='+parent.changeEncode(parent.state.deviceID)+'&cl_id='+parent.changeEncode(parent.state.cl_id)+'&auth='+parent.changeEncode(parent.state.auth)+'&expiry=&imFact=0&schTime=';
          console.log(url);

            $.ajax({
              url: url,
              xhrFields: {
                  withCredentials: true
              },
              success: function(value){
                parent.setState({
                  modal: true,
                  responseMessage: value
                });
              }
            });
        }
      })
    }
    else{
      this.setState({
        responseMessage: 'Link url should contain http or https',
        modal: true
      })
    }
  }

  componentDidMount(){
    var parent = this;
    $.ajax({
      url: 'https://www.informvisitors.com/deviceIDApiNewUI.php',
      xhrFields: {
          withCredentials: true
      },
      success: function(value){
        value = JSON.parse(value);
          parent.setState({

            deviceID: value[0]['dev_id'],
            auth: value[0]['auth'],
            cl_id: value[0]['cl_id']
          });
      }
    });
  }

  handleChangeExpiry(newDate){
    var getDate;
    var parent = this;
    setTimeout(function(){
      getDate = document.querySelector('#expiryTime .form-control').value;
      console.log(getDate);
      var getDateTime = getDate.split(' ');
      var time = getDateTime[1]+ ' '+ getDateTime[2];
      console.log(time);
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if(AMPM == "PM" && hours<12) hours = hours+12;
      if(AMPM == "AM" && hours==12) hours = hours-12;
      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      if(hours<10) sHours = "0" + sHours;
      if(minutes<10) sMinutes = "0" + sMinutes;
      parent.setState({
        expiryDate: getDateTime[0],
        expiryDateTime: sHours + ":" + sMinutes
      });
      console.log(parent.state.expiryDate);
      console.log(parent.state.expiryDateTime);
    },100);
    // console.log("newDate", JSON.stringify(newDate));
    // return this.setState({date: newDate});
  }



  handleChangeSchedule(newDate){
    var getDate;
    var parent = this;
    setTimeout(function(){
      getDate = document.querySelector('#scheduleTime .form-control').value;
      console.log(getDate);
      var getDateTime = getDate.split(' ');
      var time = getDateTime[1]+ ' '+ getDateTime[2];
      console.log(time);
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var AMPM = time.match(/\s(.*)$/)[1];
      if(AMPM == "PM" && hours<12) hours = hours+12;
      if(AMPM == "AM" && hours==12) hours = hours-12;
      var sHours = hours.toString();
      var sMinutes = minutes.toString();
      if(hours<10) sHours = "0" + sHours;
      if(minutes<10) sMinutes = "0" + sMinutes;
      parent.setState({
        scheduleDate: getDateTime[0],
        scheduleDateTime: sHours + ":" + sMinutes
      });
      console.log(parent.state.scheduleDate);
      console.log(parent.state.scheduleDateTime);
    },100);
  }

  onStickyChange1(){
    var parent = this;
    this.setState({
      sticky: 1
    });
  }

  button1Changed(event){
    this.setState({
      button1Text: event.target.value
    });
    if(event.target.value){
      this.setState({
        button1ClickedFlag : true
      })
    }
    else{
      this.setState({
        button1ClickedFlag : false
      })
    }
  };

  demoPushButtonClicked(){
    var parent = this;
      // console.log('https://www.informvisitors.com/uploadPush2.php?image='+this.state.image+'&title='+this.state.title+'&desc='+this.state.description+'&link=https%3A%2F%2Fwww.informvisitors.com%2FpushPanel.php&button1='+this.state.button1Text+'&button2='+this.state.button2Text+'&link1Desk='+this.state.link1Desktop+'&link1Mob='+this.state.link1Mobile+'&link2Desk='+this.state.link2Desktop+'&link2Mob='+this.state.link2Mobile+'&isSticky='+this.state.sticky+'&suspendTime='+this.state.suspendTime+'&tags='+this.state.tags+'&type=0&email='+this.state.deviceID+'&cl_id=&auth=&expiry=&imFact=0&schTime=');
          $.ajax({
            url: 'https://www.informvisitors.com/uploadPush2.php?image='+this.state.image+'&title='+this.state.title+'&desc='+this.state.description+'&link=https%3A%2F%2Fwww.informvisitors.com%2FpushPanel.php&button1='+this.state.button1Text+'&button2='+this.state.button2Text+'&link1Desk='+this.state.link1Desktop+'&link1Mob='+this.state.link1Mobile+'&link2Desk='+this.state.link2Desktop+'&link2Mob='+this.state.link2Mobile+'&isSticky='+this.state.sticky+'&suspendTime='+this.state.suspendTime+'&tags='+this.state.tags+'&type=0&email='+this.state.deviceID+'&cl_id=&auth=&expiry=&imFact=0&schTime=',
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

   handleChangeSelect(event) {
    var parent = this;
      this.setState({
        select: event.target.value
      });
      
        setTimeout(function(){
          if(parent.state.select == '2'){
            parent.setState({
              modalDemoPush: true
            });
            console.log(parent.state.modalDemoPush);
          }
        },20);
      
    }


  handleChange(input, e){
    let text = e.target.value;
    this.setState({
      [input]: text
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
 
  toggleDemoPush() {
    this.setState({
      modalDemoPush: !this.state.modalDemoPush,
      select: '0'
    });
  }
 

  button2Changed(event){
      this.setState({
        button2Text: event.target.value
      });
    if(event.target.value){
      this.setState({
        button2ClickedFlag : true
      })
    }
    else{
      this.setState({
        button2ClickedFlag : false
      })
    }
  };

  render(){
    return(
      <div className="row">
      <div className="col-sm-12 col-lg-6">

        <div className="card">
          <div className="card-header">
            <strong>Test your push notifications by sending it to yourself </strong>
          </div>
          <div className="card-block">
            <div className="form-group">
              <label htmlFor="imageDemoPush">Image(Optional)</label>
              <input type="text"  onChange={e => this.handleChange('image', e)} className="form-control" id="imageDemoPush" placeholder="Image 80*80"/>
            </div>

            <div className="form-group">
              <label htmlFor="titleDemoPush">Title<span className="required">*</span></label>
              <input type="text" onChange={e => this.handleChange('title', e)}  className="form-control" id="titleDemoPush" placeholder="Enter the title" required="true" />
            </div>

            <div className="form-group">
              <label htmlFor="descriptionDemoPush">Description<span className="required">*</span></label>
              <textarea className="form-control" onChange={e => this.handleChange('description', e)}  id="descriptionDemoPush" placeholder="Enter the link"/>
            </div>

            <div className="form-group">
              <label htmlFor="linkDemoPush">Link<span className="required">*</span></label>
              <input type="text" className="form-control" onChange={e => this.handleChange('link', e)}  id="linkDemoPush" placeholder="Enter the title" required="true" />
            </div>

            <div className="form-group">
              <label htmlFor="button1DemoPush" >Button-1 (Text)</label>
              <input type="text" className="form-control" onChange={this.button1Changed} id="button1DemoPush" placeholder="Enter the link" required/>
            </div>

            { this.state.button1ClickedFlag && <div style={{margin: '0 0 0 auto', borderLeft:'1px solid #eee'}} className="animated fadeIn col-sm-11 ">
              <div className="form-group">
                <label htmlFor="link1DesktopDemoPush">Link1 (Desktop)</label>
                <input type="text"  onChange={e => this.handleChange('link1Desktop', e)} className="form-control" id="link1DesktopDemoPush" placeholder="Enter the link" required/>
              </div>

              <div className="form-group">
                <label htmlFor="link1MobileDemoPush">Link1 (Mobile)</label>
                <input type="text"  onChange={e => this.handleChange('link1Mobile', e)} className="form-control" id="link1MobileDemoPush" placeholder="Enter the link" required/>
              </div></div>
            }

            <div className="form-group">
              <label htmlFor="button2DemoPush" >Button-2 (Text)</label>
              <input type="text" className="form-control" onChange={this.button2Changed} id="button2DemoPush" placeholder="Enter the link" required/>
            </div>

            { this.state.button2ClickedFlag && <div style={{margin: '0 0 0 auto', borderLeft:'1px solid #eee'}} className="animated fadeIn col-sm-11">
              <div className="form-group">
                <label htmlFor="link2DesktopDemoPush">Link2 (Desktop)</label>
                <input type="text"  onChange={e => this.handleChange('link2Desktop', e)} className="form-control" id="link2DesktopDemoPush" placeholder="Enter the link" required/>
              </div>

              <div className="form-group">
                <label htmlFor="link2MobileDemoPush">Link2 (Mobile)</label>
                <input type="text"  onChange={e => this.handleChange('link2Mobile', e)} className="form-control" id="link2MobileDemoPush" placeholder="Enter the link" required/>
              </div></div>
            }

            <div className="form-group row">
              <label className="col-md-3 form-control-label">Sticky<span className="required">*</span></label>
              <div className="col-md-9">
                <div className="row">
                  <div className="radio col-md-12">
                    <label htmlFor="radioDemo1">
                      <input checked={this.state.sticky == 0} id="radioDemo1" type="radio" onChange={this.onStickyChange0} name="radios" /> Close automatically after 20 seconds (recommended)
                    </label>
                  </div>
                  <div className="radio col-md-12">
                    <label htmlFor="radioDemo2">
                      <input type="radio" id="radioDemo2" checked={this.state.sticky == 1} onChange={this.onStickyChange1} name="radios" /> Close only when the user clicks the notification or presses ‘X’
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="suspendDemoPush">Suspend after Push Extra click (sec)<span className="required">*</span></label>
              <input type="text" onChange={e => this.handleChange('suspendTime', e)}  className="form-control" id="suspendDemoPush" placeholder="Suspend Time"/>
            </div>


            <div className="form-group">
              <label htmlFor="tagsDemoPush">Targeted User Tags (Optional, Comma Separated)</label>
              <input type="text" onChange={e => this.handleChange('targetedTags', e)}  className="form-control" id="tagsDemoPush" placeholder="Targeted User Tags"/>
            </div>


            <div id="expiryTime" className="form-group">
              <label htmlFor="tags">Expiry Time<span className="required">*</span></label>
              <DateTimeField dateFormat="YYYY-MM-DD" defaultValue="Please select a date"
                        onChange={this.handleChangeExpiry}/>
            </div>
            <div id="scheduleTime" className="form-group">
              <label htmlFor="tags">Schedule Time</label>
              <DateTimeField dateFormat="YYYY-MM-DD" defaultValue="Please select a date"
                       onChange={this.handleChangeSchedule}/>
            </div>


              <button type="button" className="btn btn-primary" onClick={this.actualPushButtonClicked}>Send Push</button>
              <button name="selectCheck" onClick={this.sendDemoPush} type="button" className="btn btn-warning second_button">Send Demo Push
              </button>

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
      <div className="col-sm-6">

          <div className="card-header">
            See as you type
          </div>
          <div className="card-block">
            <PushVisual image={this.state.image} title={this.state.title} description={this.state.description} link={this.state.link} button1={this.state.button1Text} button2={this.state.button2Text}/>
          </div>
      </div>
      </div>

    );
  }
}