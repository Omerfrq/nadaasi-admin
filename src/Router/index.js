import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ViewOrders } from '../views/viewOrders';
import { ViewCoupon } from '../views/viewCoupons';
import { AddCoupon } from '../views/addCoupon';
import { ViewProducts } from '../views/viewProduct';
import { UploadProduct } from '../views/uploadProduct';
import { Feedback } from '../views/feedback';
import { Users } from '../views/users';
import { Login } from '../views/login';

export const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/users' component={Users} />
      <Route exact path='/feedback' component={Feedback} />
      <Route exact path='/upload-product' component={UploadProduct} />
      <Route exact path='/products' component={ViewProducts} />
      <Route exact path='/add-coupon' component={AddCoupon} />
      <Route exact path='/coupons' component={ViewCoupon} />
      <Route exact path='/orders' component={ViewOrders} />
    </Switch>
  );
};
