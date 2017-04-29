import React, { Component } from 'react';
import { Link } from 'react-router'

import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler hidden-lg-up" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="https://informvisitors.com"></a>
        <ul className="nav navbar-nav hidden-md-down">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle} href="#">&#9776;</a>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <div onClick={this.toggle} className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="hidden-md-down">admin</span>
              </div>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>

                <Link to={'/accountSettings'} style={{cursor:'pointer'}}><DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem></Link>
                <Link to={'/signOut'} style={{cursor:'pointer'}}><DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem></Link>

              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item hidden-md-down">
            <a className="nav-link navbar-toggler aside-menu-toggler" onClick={this.asideToggle} href="#">&#9776;</a>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
