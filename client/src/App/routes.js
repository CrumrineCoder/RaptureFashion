import React from "react";
import { Route, Switch } from "react-router";
//, Redirect
//import { withRouter } from 'react-router-dom';
//import axios from "axios";

// Import modules/routes
import Home from "./home";
//import Login from "./login";
import ProductDetails from "./details";
import Dress from "./categories";
import PageNotFound from "./common/components/PageNotFound";
import Bag from "./bag";
import Checkout from "./checkout";
import About from "./about";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/categories/brands/gibson"   render={(props) => <Dress {...props} vendor={"Gibson Girls"} />}/>
    <Route path="/categories/brands/ryan"   render={(props) => <Dress {...props} vendor={"Ryan Boutique"} />}/>
    <Route path="/categories/brands/apollo"   render={(props) => <Dress {...props} vendor={"Apollo"} />}/>
    <Route path="/categories/brands/áveline"   render={(props) => <Dress {...props} vendor={"ÁVELINE'S"} />}/>
    <Route path="/clothing/"  render={(props) => <Dress {...props} clothing={"all"} />}/>
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
