import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import classnames from 'classnames';
import $ from 'jquery';


class SubscribersDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableMap: null,
      labelsGraph: [],
      dataGraph: [],
      line : {
              labels: [],
              datasets: [
                {
                  label: 'My First dataset',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: []
                }
              ]
            }
    };
  }

  letsSee(){
    
  };

  componentDidMount(){
    var parent = this;
    var dates=[], respectiveValues=[];
    var count = 0, countMore = 0;
    $.ajax({
       url: 'https://www.informvisitors.com/subscribersApiNewUI.php',
       xhrFields: {
          withCredentials: true
       },
      success: function(value){
        console.log('aao');
        // console.log(value);
        value = JSON.parse(value);
        parent.setState({
          tableMap: {a:{sad:'das'}}
        });
        parent.setState({
          tableMap: value
        });

        let helloGraph = parent.state.tableMap && Object.keys(parent.state.tableMap).sort().reverse().map(function(val, i) {
                  count++;
                  // console.log('lets check');
                  // console.log(typeof(val));
                  if(count <= 30){
                    dates.unshift(val);
                    respectiveValues.unshift(parent.state.tableMap[val]["isActive"]);
                  }
                  else{
                    if(countMore == 0){
                          parent.setState({  
                                line : {
                                  labels: dates,
                                  datasets: [
                                    {
                                      label: 'New Subscribers/Day for last 30 days',
                                      fill: false,
                                      lineTension: 0.1,
                                      backgroundColor: 'rgba(75,192,192,0.4)',
                                      borderColor: 'rgba(75,192,192,1)',
                                      borderCapStyle: 'butt',
                                      borderDash: [],
                                      borderDashOffset: 0.0,
                                      borderJoinStyle: 'miter',
                                      pointBorderColor: 'rgba(75,192,192,1)',
                                      pointBackgroundColor: '#fff',
                                      pointBorderWidth: 1,
                                      pointHoverRadius: 5,
                                      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                      pointHoverBorderColor: 'rgba(220,220,220,1)',
                                      pointHoverBorderWidth: 2,
                                      pointRadius: 1,
                                      pointHitRadius: 10,
                                      data: respectiveValues
                                    }
                                  ]
                                }
                          });
                      countMore++;
                    }
                  }
                  
                  // console.log(parent.state.tableMap[val]['isActive']);
                  return true;
                })


      }
    })
    
    
   console.log(dates);
   console.log(respectiveValues);
    console.log(this.state.line);
  };

  render() {
    
    var parent = this;
    let hello = this.state.tableMap && Object.keys(this.state.tableMap).sort().reverse().map(function(val, i) {
                  // console.log(parent.state.tableMap[val]['isActive']);
                  return <tr className="text-center" key={i}>
                            <td>{val}</td>
                            <td>{parent.state.tableMap[val]["isActive"]}</td>
                            <td>{parent.state.tableMap[val]["isInActive"]}</td>
                            <td>{parent.state.tableMap[val]["totI"]}</td>
                            <td>{parent.state.tableMap[val]["totA"]}</td>
                          </tr>
                })
    return (
      <div className="animated fadeIn">
        <div className = "row">
          <div className="card-block">
              <div className="chart-wrapper" style={{height: '200px'}}>
                <Line data={this.state.line}
                  options={{
                    maintainAspectRatio: false
                  }}
                />
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                Subscribers Details
              </div>
              <table className="table table-striped">
                  <thead>
                    <tr className="text-center">
                      <th className="text-center">Date</th>
                      <th className="text-center">Subscribed</th>
                      <th className="text-center">Unsubscribed</th>
                      <th className="text-center">Total Subscribers</th>
                      <th className="text-center">Total Active Subscribers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                     hello
                    }
                    
                  </tbody>
              </table>
              
              <div className="card-block">
                
              </div>
            </div>
          </div>
        </div>
    </div>
      
    )
  }
}

export default SubscribersDetails;
