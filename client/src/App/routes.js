import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router";
import { connect } from 'react-redux';
//, Redirect
//import { withRouter } from 'react-router-dom';
//import axios from "axios";

// Import modules/routes
import Home from "./home";
//import Login from "./login";
import Profile from "./profile";
import ProductDetails from "./details";
import PollShow from "./poll";
import Dress from "./categories";
import Edit from "./profile/edit";
import Result from "./result";
import PageNotFound from "./common/components/PageNotFound";
import Login from "./home/login/LoginForm";
import Register from "./home/login/RegisterForm";
import Bag from "./bag";
import Checkout from "./checkout";
import About from "./about";

import { userActions } from '../App/_actions/users.actions.js';

// Private route that redirects the user if they're not logged in to the login page
class PrivateRoute extends React.Component {

  // Upon the first render, check if the user is logged in 
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getCurrent());
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { didInvalidateCurrentUser, isFetchingCurrentUser } = this.props.users;
    let pageContent = '';

    // If there is no current user
    if(didInvalidateCurrentUser){
      // Reroute the user to the login page, and send data about where they came from
      pageContent = (
        (
          <Route {...rest} render={props => (
            localStorage.getItem('user')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
        )
      )
    }
    // If we're still checking who is logged in, tell the user we're validating
    else if (isFetchingCurrentUser) {
      pageContent = (
        <div className="pollsLoader">
            Validating...
      	</div>
      )
    } 
    // The user is logged in, so show them the route as normal
    else{
      pageContent = (
        (
          <Route {...rest} render={props => (
        
            <div> <Component {...props} /></div>
        )} />
        )
      )
    }

    return (
      <div>{pageContent}</div>
    )

  }
}

function mapStateToProps(state) {
  const { users } = state.home;

  return {
    users
  };
  
}

PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRoute));

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/categories/brands/gibson"   render={(props) => <Dress {...props} vendor={"Gibson Girls"} />}/>
    <Route path="/categories/brands/ryan"   render={(props) => <Dress {...props} vendor={"Ryan Boutique"} />}/>
    <Route path="/categories/brands/apollo"   render={(props) => <Dress {...props} vendor={"Apollo"} />}/>
    <Route path="/categories/brands/áveline"   render={(props) => <Dress {...props} vendor={"ÁVELINE'S"} />}/>
    <Route path="/categories/all"  render={(props) => <Dress {...props} clothing={"all"} />}/>
    <Route path="/categories/dresses"   render={(props) => <Dress {...props} clothing={"dresses"} />}/>
    <Route path="/categories/accessories"   render={(props) => <Dress {...props} clothing={"accessories"} />}/>
    <Route path="/categories/shoes"   render={(props) => <Dress {...props} clothing={"shoes"} />}/>
    <Route path="/categories/hats"   render={(props) => <Dress {...props} clothing={"hats"} />}/>
    <Route path="/bag" component={Bag} />
    <Route path="/about" component={About} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/products/:id/" component={ProductDetails} />
    <Route component={PageNotFound} />
  </Switch>
);
