import React, { Component } from 'react';
import { Link } from 'react-router'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <Link to={'/home'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'/sendpush'} className="nav-link" activeClassName="active"><i className="icon-paper-plane"></i> Send Push</Link>
            </li>
            <li className="nav-item">
              <Link to={'/sentNotifications'} className="nav-link" activeClassName="active"><i className="icon-speech"></i> Sent Notifications</Link>
            </li>
            <li className="nav-item">
              <Link to={'/sentNotifications'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Tag your users</Link>
            </li>
            <li className="nav-item">
              <Link to={'/subscribersDetails'} className="nav-link" activeClassName="active"><i className="icon-people"></i> Subscribers Details</Link>
            </li>
            <li className="nav-item">
              <Link to={'/autoPushSettings'} className="nav-link" activeClassName="active"><i className="icon-plane"></i> Auto Push Settings</Link>
            </li>
            <li className="nav-item">
              <Link to={'/autoPushSettings'} className="nav-link" activeClassName="active"><i className="icon-magic-wand"></i> Get Code</Link>
            </li>
            <li className="nav-item">
              <Link to={'/autoPushSettings'} className="nav-link" activeClassName="active"><i className="icon-wallet"></i> Revenue Calculator</Link>
            </li>
            <li className="nav-item">
              <a href="https://wordpress.org/plugins/informvisitors/" className="nav-link"><i className="icon-share"></i> Wordpress Plugin</a>
            </li>
            <li className="nav-item">
              <Link to={'/accountSettings'} className="nav-link" activeClassName="active"><i className="icon-settings"></i> Account Settings</Link>
            </li>
            <li className="nav-item">
              <Link to={'/accountSettings'} className="nav-link" activeClassName="active"><i className="icon-paper-clip"></i> Billing</Link>
            </li>

            <li className="nav-item">
              <Link to={'/signOut'} className="nav-link" activeClassName="active"><i className="icon-logout"></i> Sign Out</Link>
            </li>
            
            
            
            <li className="nav-item">
              <Link to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span></Link>
            </li>
            <li className="nav-title">
              UI Elements
            </li>
            <li className={this.activeRoute("/components")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-puzzle"></i> Components</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <Link to={'/components/buttons'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Buttons</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/components/social-buttons'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Social Buttons</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/components/cards'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Cards</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/components/forms'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Forms</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/components/modals'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Modals</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/components/switches'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Switches</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/components/tables'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Tables</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/components/tabs'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Tabs</Link>
                </li>
              </ul>
            </li>
            <li className={this.activeRoute("/icons")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> Icons</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <Link to={'/icons/font-awesome'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Font Awesome</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/icons/simple-line-icons'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Simple Line Icons</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to={'/widgets'} className="nav-link" activeClassName="active"><i className="icon-calculator"></i> Widgets <span className="badge badge-info">NEW</span></Link>
            </li>
            <li className="nav-item">
              <Link to={'/charts'} className="nav-link" activeClassName="active"><i className="icon-pie-chart"></i> Charts</Link>
            </li>
            <li className="divider"></li>
            <li className="nav-title">
              Extras
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> Pages</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <Link to={'/pages/login'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Login</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/pages/register'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/pages/404'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Error 404</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/pages/500'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Error 500</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
