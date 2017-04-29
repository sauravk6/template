import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Containers
import Full from './containers/Full/'
import Simple from './containers/Simple/'

import Charts from './views/Charts/'
import Dashboard from './views/Dashboard/'
import AutoPushSettings from './views/AutoPushSettings/'
import SentNotifications from './views/SentNotifications/'
import AccountSettings from './views/AccountSettings/AccountSettings.js'
import Home from './views/Home/'
import SendPush from './views/SendPush/'
import SubscribersDetails from './views/SubscribersDetails/SubscribersDetails.js'
import Buttons from './views/Components/Buttons/'
import Cards from './views/Components/Cards/'
import Forms from './views/Components/Forms/'
import SignOut from './views/SignOut.js'
import Modals from './views/Components/Modals/'
import PassState from './views/template/'
import SocialButtons from './views/Components/SocialButtons/'
import Switches from './views/Components/Switches/'
import Tables from './views/Components/Tables/'
import Tabs from './views/Components/Tabs/'
import FontAwesome from './views/Icons/FontAwesome/'
import SimpleLineIcons from './views/Icons/SimpleLineIcons/'
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'
import Widgets from './views/Widgets/'

export default (
  <Router history={hashHistory}>
    <Route path="/" name="Home" component={Full}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" name="Dashboard" component={Dashboard}/>
      <Route path="home" name="Home" component={Home}/>
      <Route path="sendpush" name="Send Push" component={SendPush}/>
      <Route path="subscribersdetails" name="Subscribers Details" component={SubscribersDetails}/>
      <Route path="template" name="template" component={PassState}/>
      <Route path="accountSettings" name="Account Settings" component={AccountSettings}/>
      <Route path="sentNotifications" name="Sent Notifications" component={SentNotifications}/>
      <Route path="autoPushSettings" name="Auto Push Settings" component={AutoPushSettings}/>
      <Route path="signOut" name="Sign Out" component={SignOut}/>
      <Route path="components/" name="Components">
        <IndexRoute component={Buttons}/>
        <Route path="buttons" name="Buttons" component={Buttons}/>
        <Route path="cards" name="Cards" component={Cards}/>
        <Route path="forms" name="Forms" component={Forms}/>
        <Route path="modals" name="Modals" component={Modals}/>
        <Route path="social-buttons" name="Social Buttons" component={SocialButtons}/>
        <Route path="switches" name="Swithces" component={Switches}/>
        <Route path="tables" name="Tables" component={Tables}/>
        <Route path="tabs" name="Tabs" component={Tabs}/>
      </Route>
      <Route path="icons/" name="Icons">
        <IndexRoute component={FontAwesome}/>
        <Route path="font-awesome" name="Font Awesome" component={FontAwesome}/>
        <Route path="simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
      </Route>
      <Route path="widgets" name="Widgets" component={Widgets}/>
      <Route path="charts" name="Charts" component={Charts}/>
    </Route>
    <Route path="pages/" name="Pages" component={Simple}>
      <IndexRoute component={Page404}/>
      <Route path="login" name="Login Page" component={Login}/>
      <Route path="register" name="Register Page" component={Register}/>
      <Route path="404" name="Page 404" component={Page404}/>
      <Route path="500" name="Page 500" component={Page500}/>
    </Route>
  </Router>
);
