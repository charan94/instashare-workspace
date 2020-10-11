import React, { Component } from 'react';
import Switch from 'react-bootstrap/esm/Switch';
import { Route } from 'react-router-dom';
import './auth.scss';
import Login from './login/login';
import Register from './register/register';

export const Auth = () => {
  return (
    <section className="section section-shaped section-lg bg-gradient-default">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <Switch>
              <Route path="/auth/login">
                <Login />
                <div className="row mt-3">
                  <div className="col-6">
                    <a href="/auth/register" className="text-light"><small>Register</small></a>
                  </div>
                </div>
              </Route>
              <Route path="/auth/register">
                <Register />
                <div className="row mt-3">
                  <div className="col-6">
                    <a href="/auth/login" className="text-light"><small>Login</small></a>
                  </div>
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </section>);
}
export default Auth;
