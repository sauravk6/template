import React, { Component } from 'react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import $ from 'jquery';


// const doughnut = {
//   labels: [
//     'Red',
//     'Green',
//     'Yellow'
//   ],
//   datasets: [{
//     data: ['300', '50', '100'],
//     backgroundColor: [
//     '#477fa0',
//     '#20a69f',
//     '#FFCE56'
//     ],
//     hoverBackgroundColor: [
//     '#FF6384',
//     '#20a69f',
//     '#FFCE56'
//     ]
//   }]
// };


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      topTags: [],
      bar : {
                    labels: [],
                    datasets: [
                      {
                        label: 'Top Tags',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: []
                      }
                    ]
                  },
      doughnut: {
                  labels: [
                    'Desktop Users',
                    'Mobile Users'
                  ],
                  datasets: [{
                    data: ['', ''],
                    backgroundColor: [
                    '#477fa0',
                    '#20a69f'
                    ],
                    hoverBackgroundColor: [
                    '#477fa0',
                    '#20a69f'
                    ]
                  }]
                },

      lineNewSubscribers : {
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
      },

       doughnutActive: {
                labels: [
                  'Desktop Users',
                  'Mobile Users'
                ],
                datasets: [{
                  data: ['', ''],
                  backgroundColor: [
                  '#477fa0',
                  '#20a69f'
                  ],
                  hoverBackgroundColor: [
                  '#477fa0',
                  '#20a69f'
                  ]
                }]
              },
        inactiveUsers: 0,
        total: null,
        active: null,
        pie : {
                labels: [
                  'Red',
                  'Green',
                  'Yellow'
                ],
                datasets: [{
                  data: ['', ''],
                  backgroundColor: [
                  '#477fa0',
                  '#20a69f',
                  '#FFCE56'
                  ],
                  hoverBackgroundColor: [
                  '#477fa0',
                  '#20a69f',
                  '#FFCE56'
                  ]
                }]
              }
   
      }
    };
  

  componentDidMount(){
    const parent = this;
    $.ajax({
       url: 'https://www.informvisitors.com/homeApiNewUI.php',
       xhrFields: {
          withCredentials: true
       },
      success: function(value){
        value = JSON.parse(value);
        console.log(typeof(value));
        console.log(value.total);
        parent.setState({
          inactiveUsers : parseInt(value.total) - parseInt(value.users),
          total : parseInt(value.total),
          active : parseInt(value.users)
        }) ;
        console.log(parent.state.inactiveUsers);
        parent.setState({
          doughnut: {
                  labels: [
                    'Desktop Users',
                    'Mobile Users'
                  ],
                  datasets: [{
                    data: [value.desktopUsers, value.mobileUsers],
                    backgroundColor: [
                    '#477fa0',
                    '#20a69f'
                    ],
                    hoverBackgroundColor: [
                    '#477fa0',
                    '#20a69f'
                    ]
                  }]
                },
          doughnutActive: {
                  labels: [
                    'Active Users',
                    'Inactive Users'
                  ],
                  datasets: [{
                    data: [value.users, parent.state.inactiveUsers],
                    backgroundColor: [
                    '#477fa0',
                    '#20a69f'
                    ],
                    hoverBackgroundColor: [
                    '#477fa0',
                    '#20a69f'
                    ]
                  }]
                },
          topTags: value.tags
           
          
        })
        console.log('checkdsa');
        var responseBarGraph = [], labelsBarGraph = [];
        console.log(typeof(parent.state.topTags));
        let barGraph = parent.state.topTags && Object.keys(parent.state.topTags).sort().reverse().map(function(val, i) {
            console.log(labelsBarGraph.push(val));
            console.log(responseBarGraph.push(parent.state.topTags[val]));
        });
        console.log(responseBarGraph);
        console.log(labelsBarGraph);
        parent.setState({
            bar : {
                    labels: labelsBarGraph,
                    datasets: [
                      {
                        label: 'Top Tags',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: responseBarGraph
                      }
                    ]
                  }
        })

      }
      // return data.json();
    })
    $.ajax({
       url: 'https://www.informvisitors.com/topLocationsApiNewUI.php',
       xhrFields: {
          withCredentials: true
       },
      success: function(value){
        value = JSON.parse(value);
        console.log('locations');
        let locationsArray = [];
        let locationsValueArray = [];
        for(let locations in value){
          locationsArray.push(locations);
          locationsValueArray.push(value[locations]);
          // console.log(locations + value[locations]);
        }
        console.log('lets check');
        console.log(locationsArray);
        console.log(locationsValueArray);
        console.log(value["Mumbai"]);
        parent.setState({
            pie : {
                labels: 
                  locationsArray,
                datasets: [{
                  data: locationsValueArray,
                  backgroundColor: [
                  '#477fa0',
                  '#20a69f',
                  '#FFCE56'
                  ],
                  hoverBackgroundColor: [
                  '#477fa0',
                  '#20a69f',
                  '#FFCE56'
                  ]
                }]
              }
        });
      }
    })

    var datesNewSubscribers=[], respectiveValuesNewSubscribers=[];
    var count = 0, countMore = 0;
    $.ajax({
       url: 'https://www.informvisitors.com/subscribersApiNewUI.php',
       xhrFields: {
          withCredentials: true
       },
      success: function(value){
        // console.log('aao');
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
                  if(count <= 10){
                    datesNewSubscribers.unshift(val);
                    respectiveValuesNewSubscribers.unshift(parent.state.tableMap[val]["isActive"]);
                  }
                  else{
                    if(countMore == 0){
                          parent.setState({  
                                lineNewSubscribers : {
                                  labels: datesNewSubscribers,
                                  datasets: [
                                    {
                                      label: 'New Subscribers/Day for last 10 days',
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
                                      data: respectiveValuesNewSubscribers
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
    var datesNewdelivered=[], respectiveValuesCTR=[];
    var countSecond = 0, countMoreSecond = 0;


    $.ajax({
       url: 'https://www.informvisitors.com/notificationsManualSentNewUI.php',
       xhrFields: {
          withCredentials: true
       },
       success: function(value){
        console.log('sent notifications check');
        value = JSON.parse(value);
        console.log(value);
          parent.setState({
            tableMapSentNotifications: {a:{sad:'das'}}
          });
          parent.setState({
            tableMapSentNotifications: value
          });


          let helloGraphSent = parent.state.tableMapSentNotifications && Object.keys(parent.state.tableMapSentNotifications).map(function(val, i) {
                  console.log('lets see');
                  countSecond++;
                  // console.log('lets check');
                  // console.log(typeof(val));
                  if(countSecond <= 10){
                    if(parent.state.tableMapSentNotifications[val]["CTR"] == 'N/A'){
                      countSecond--;
                    }
                    else{
                      datesNewdelivered.unshift(parent.state.tableMapSentNotifications[val]["delivered"]);
                      respectiveValuesCTR.unshift(parseFloat(parent.state.tableMapSentNotifications[val]["CTR"]));
                    }
                  }
                  else{
                    console.log(datesNewdelivered);
                    console.log(respectiveValuesCTR);
                    if(countMoreSecond == 0){
                          console.log(datesNewdelivered);
                          console.log(respectiveValuesCTR);
                          parent.setState({  
                                lineSentStats : {
                                  labels: datesNewdelivered,
                                  datasets: [
                                    {
                                      label: 'CTR',
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
                                      data: respectiveValuesCTR
                                    }
                                  ]
                                }
                          });
                      countMoreSecond++;
                    }
                  }
                  
                  // console.log(parent.state.tableMap[val]['isActive']);
                  return true;
                })

          // console.log('value');
          // console.log(value);
        }
      })
      console.log(this.state.doughnut);

    // console.log(a);
  };

  render() {
    return (
      <div>
        <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="card card-inverse card-primary">
                <div className="card-block pb-0">
                  <div className="btn-group float-right">
                    
                  </div>
                  <h4 className="mb-0 text-center">{this.state.total}</h4>
                  <p className="text-center">Total Subscribers</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-inverse card-info">
                <div className="card-block pb-0">
                  <div className="btn-group float-right">
                    
                  </div>
                  <h4 className="mb-0 text-center">{this.state.active}</h4>
                  <p className="text-center">Active Subscribers</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-inverse card-warning">
                <div className="card-block pb-0">
                  <div className="btn-group float-right">
                    
                  </div>
                  <h4 className="mb-0 text-center">9.823</h4>
                  <p className="text-center">Members online</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-inverse card-danger">
                <div className="card-block pb-0">
                  <div className="btn-group float-right">
                    
                  </div>
                  <h4 className="mb-0 text-center">9.823</h4>
                  <p className="text-center">Members online</p>
                </div>
              </div>
            </div>
        </div>
        <div className = "row">
          <div className="col-lg-6 col-md-12">
              <div className="card">
                <div className="card-header">
                  New Subscribers per day
                </div>
                <div className="card-block">
                  <div className="chart-wrapper">
                    <Line data={this.state.lineNewSubscribers}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
              </div>
          </div>

          <div className="col-lg-6 col-md-12">
              <div className="card">
                <div className="card-header">
                  CTR vs Push Id
                </div>
                <div className="card-block">
                  <div className="chart-wrapper">
                    <Line data={this.state.lineSentStats}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>
        
        <div className="row">

          <div className="col-sm-6">
            <div className="card">
              <div className="card-header">
                Total Subscribers
              </div>
              <div className="card-block">
                <div className="chart-wrapper">
                  <Doughnut data={this.state.doughnut} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-header">
                Subscribers Status
              </div>
              <div className="card-block">
                <div className="chart-wrapper">
                  <Doughnut data={this.state.doughnutActive} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-header">
                Top Locations
              </div>
               <div className="card-block">
                <div className="chart-wrapper">
                  <Pie data={this.state.pie} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-header">
                Top Tags
              </div>
              <div className="card-block">
                <div className="chart-wrapper">
                  <Bar data={this.state.bar}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;