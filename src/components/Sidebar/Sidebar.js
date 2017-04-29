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
              <Link to={'/template'} className="nav-link" activeClassName="active"><i className="icon-speech"></i> template</Link>
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
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
